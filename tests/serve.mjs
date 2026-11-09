// Minimaler Webserver für die Tests (liefert den Repo-Ordner aus). Keine Abhängigkeiten.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
const root = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const port = +process.env.PORT || 4173;
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.webmanifest':'application/manifest+json',
  '.png':'image/png', '.jpg':'image/jpeg', '.mp3':'audio/mpeg', '.woff2':'font/woff2', '.txt':'text/plain; charset=utf-8', '.json':'application/json' };
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  });
}).listen(port, () => console.log('Wasserrettung-Testserver auf http://localhost:' + port));
