import { useCallback, useEffect, useRef, useState } from "react";
import { renderProfile } from "@/lib/memberMarkdown";

// Kelly's member profiles. Sign in with Google; /api/members decides who gets in.

type Member = { slug: string; name: string; status: string; last_meeting: string | null; markdown: string };
type Data = { generated_at: string | null; members: Member[] };
type GoogleId = {
  initialize: (o: { client_id: string; callback: (r: { credential: string }) => void }) => void;
  renderButton: (el: HTMLElement, o: Record<string, string>) => void;
};
declare global { interface Window { google?: { accounts: { id: GoogleId } } } }

const loadGis = () =>
  new Promise<void>((resolve, reject) => {
    if (window.google?.accounts?.id) return resolve();
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Google sign-in failed to load"));
    document.head.appendChild(s);
  });

const Members = () => {
  const [data, setData] = useState<Data | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const button = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    const r = await fetch("/api/members", { credentials: "same-origin" });
    if (r.status === 401) return setClientId((await r.json()).clientId);
    if (!r.ok) return setError((await r.json().catch(() => ({}))).error || "Could not load profiles");
    setClientId(null);
    setData(await r.json());
  }, []);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    document.title = "Members — C12 Indy";
    load();
    return () => { meta.remove(); };
  }, [load]);

  useEffect(() => {
    if (!clientId || !button.current) return;
    loadGis().then(() => {
      window.google!.accounts.id.initialize({
        client_id: clientId,
        callback: async ({ credential }) => {
          const r = await fetch("/api/members", {
            method: "POST", credentials: "same-origin",
            headers: { "Content-Type": "application/json" }, body: JSON.stringify({ credential }),
          });
          if (r.ok) load();
          else setError((await r.json().catch(() => ({}))).error || "Sign-in failed");
        },
      });
      window.google!.accounts.id.renderButton(button.current!, { theme: "outline", size: "large", text: "signin_with" });
    }).catch((e) => setError(e.message));
  }, [clientId, load]);

  const signOut = async () => {
    await fetch("/api/members", { method: "POST", credentials: "same-origin",
      headers: { "Content-Type": "application/json" }, body: JSON.stringify({ logout: true }) });
    setData(null);
    load();
  };

  const member = data?.members.find((m) => m.slug === open);

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-10 text-gray-900">
      {error && <p className="mb-6 rounded bg-red-50 p-3 text-red-800" role="alert">{error}</p>}

      {clientId && !data && (
        <div className="mt-[20vh] flex flex-col items-center gap-6">
          <h1 className="text-3xl font-bold">Members</h1>
          <div ref={button} />
        </div>
      )}

      {data && !member && (
        <>
          <div className="mb-6 flex items-baseline justify-between">
            <h1 className="text-3xl font-bold">Members</h1>
            <button onClick={signOut} className="text-sm text-gray-500 underline">Sign out</button>
          </div>
          {data.members.length === 0 && <p className="text-gray-500">No profiles yet.</p>}
          <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {data.members.map((m) => (
              <li key={m.slug}>
                <button onClick={() => setOpen(m.slug)} className="w-full py-4 text-left hover:bg-gray-50">
                  <span className="block text-lg font-semibold">{m.name}</span>
                  <span className="block text-sm text-gray-500">
                    {m.last_meeting ? `Last meeting ${m.last_meeting}` : "No meeting recorded yet"}
                    {m.status === "not_closed_in_hubspot" && " · not closed in HubSpot"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {data.generated_at && <p className="mt-6 text-xs text-gray-400">Updated {data.generated_at}</p>}
        </>
      )}

      {member && (
        <article>
          <button onClick={() => setOpen(null)} className="mb-6 text-sm underline">← All members</button>
          <div
            className="prose max-w-none [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mt-8 [&_h2]:border-t [&_h2]:border-gray-200 [&_h2]:pt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mt-4 [&_h3]:font-semibold [&_h3]:text-gray-600 [&_li]:my-1 [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: renderProfile(member.markdown) }}
          />
        </article>
      )}
    </main>
  );
};

export default Members;
