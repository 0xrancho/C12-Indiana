import { createHmac, timingSafeEqual } from 'crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Kelly's member profiles, behind Sign in with Google.
//   GET  /api/members                → profiles JSON, or 401 { clientId } when not signed in
//   POST /api/members {credential}   → verifies the Google ID token, sets the session cookie
//   POST /api/members {logout:true}  → clears it
// Only emails in MEMBERS_ALLOWED_EMAILS get a session. Profiles live in a private Vercel Blob,
// pushed each morning by Atticus; this function is the only thing that reads them.

const COOKIE = 'c12_members';
const SESSION_SECS = 14 * 24 * 3600;
const PROFILES_PATH = 'members/profiles.json';

const env = (k: string) => (process.env[k] || '').trim();
const allowed = () => env('MEMBERS_ALLOWED_EMAILS').toLowerCase().split(',').map((s) => s.trim()).filter(Boolean);
const sign = (v: string) => createHmac('sha256', env('MEMBERS_SESSION_SECRET')).update(v).digest('hex');

function session(req: VercelRequest): string | null {
  const raw = (req.headers.cookie || '').split(';').map((c) => c.trim()).find((c) => c.startsWith(`${COOKIE}=`));
  if (!raw) return null;
  const [email, exp, sig] = decodeURIComponent(raw.slice(COOKIE.length + 1)).split('|');
  if (!email || !exp || !sig) return null;
  const want = Buffer.from(sign(`${email}|${exp}`));
  const got = Buffer.from(sig);
  if (want.length !== got.length || !timingSafeEqual(want, got)) return null;
  if (Number(exp) < Date.now() / 1000 || !allowed().includes(email)) return null;   // revoking = removing the email
  return email;
}

function setCookie(res: VercelResponse, value: string, maxAge: number) {
  res.setHeader('Set-Cookie',
    `${COOKIE}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/api/members; HttpOnly; Secure; SameSite=Strict`);
}

async function verifyGoogle(credential: string): Promise<string | null> {
  // Google's tokeninfo endpoint checks the signature and expiry; we check audience, issuer and email.
  const r = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
  if (!r.ok) return null;
  const t = await r.json();
  const email = String(t.email || '').toLowerCase();
  const ok = t.aud === env('GOOGLE_CLIENT_ID')
    && ['accounts.google.com', 'https://accounts.google.com'].includes(t.iss)
    && String(t.email_verified) === 'true'
    && allowed().includes(email);
  return ok ? email : null;
}

async function readProfiles(): Promise<unknown> {
  const token = env('BLOB_READ_WRITE_TOKEN');
  const storeId = token.split('_')[3] || '';
  const r = await fetch(`https://${storeId}.private.blob.vercel-storage.com/${PROFILES_PATH}`,
    { headers: { authorization: `Bearer ${token}` } });
  if (r.status === 404) return { generated_at: null, members: [] };
  if (!r.ok) throw new Error(`blob read ${r.status}`);
  return r.json();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  if (!env('GOOGLE_CLIENT_ID') || !env('MEMBERS_SESSION_SECRET') || !env('BLOB_READ_WRITE_TOKEN')) {
    return res.status(503).json({ error: 'Members page is not configured yet' });
  }

  if (req.method === 'GET') {
    if (!session(req)) return res.status(401).json({ clientId: env('GOOGLE_CLIENT_ID') });
    try {
      return res.status(200).json(await readProfiles());
    } catch (e) {
      console.error('members: profile read failed', e instanceof Error ? e.message : e);
      return res.status(502).json({ error: 'Could not load profiles' });
    }
  }

  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    if (body.logout) {
      setCookie(res, '', 0);
      return res.status(204).end();
    }
    const email = typeof body.credential === 'string' ? await verifyGoogle(body.credential) : null;
    if (!email) return res.status(403).json({ error: 'This account cannot open the members page' });
    const exp = Math.floor(Date.now() / 1000) + SESSION_SECS;
    setCookie(res, `${email}|${exp}|${sign(`${email}|${exp}`)}`, SESSION_SECS);
    return res.status(204).end();
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
