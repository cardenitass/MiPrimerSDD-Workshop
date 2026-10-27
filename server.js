import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const files = new Map([
  ['/', ['index.html', 'text/html']],
  ['/styles.css', ['styles.css', 'text/css']],
  ...['main', 'ui', 'logic', 'persistence'].map(name => [`/src/${name}.js`, [`src/${name}.js`, 'text/javascript']])
]);
createServer(async (request, response) => {
  const file = files.get(new URL(request.url, 'http://localhost').pathname);
  if (!file) { response.writeHead(404); response.end('Not found'); return; }
  try {
    const content = await readFile(new URL(file[0], import.meta.url));
    response.writeHead(200, { 'Content-Type': `${file[1]}; charset=utf-8` });
    response.end(content);
  } catch { response.writeHead(500); response.end('Unable to load application'); }
}).listen(3000, '127.0.0.1', () => console.log('Curso-PSWE-07: http://localhost:3000'));

