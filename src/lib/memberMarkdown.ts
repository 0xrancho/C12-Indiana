// The markdown subset member profiles use: #/##/### headings, "- " lists, paragraphs, **bold**.
// Escapes first, so profile text can never become markup.
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const inline = (s: string) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

export function renderProfile(md: string): string {
  const out: string[] = [];
  let para: string[] = [];
  let inList = false;
  const flushPara = () => { if (para.length) { out.push(`<p>${inline(para.join(' '))}</p>`); para = []; } };
  const closeList = () => { if (inList) { out.push('</ul>'); inList = false; } };

  for (const line of md.split('\n')) {
    const s = line.trim();
    const h = s.match(/^(#{1,3})\s+(.*)$/);
    if (h) { flushPara(); closeList(); out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); }
    else if (s.startsWith('- ') || s.startsWith('* ')) {
      flushPara();
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li>${inline(s.slice(2))}</li>`);
    } else if (!s) { flushPara(); closeList(); }
    else { closeList(); para.push(s); }
  }
  flushPara(); closeList();
  return out.join('\n');
}
