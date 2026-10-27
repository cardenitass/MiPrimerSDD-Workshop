import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('UI accepts task service without importing persistence or accessing storage', async () => {
  const source = await readFile(new URL('../src/ui.js', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /localStorage|import.*persistence/);
  const ui = await import('../src/ui.js');
  assert.equal(typeof ui.initializeUI, 'function');
});
test('composition is the served HTML entry point', async () => {
  const read = name => readFile(new URL(`../${name}`, import.meta.url), 'utf8');
  assert.match(await read('index.html'), /src="src\/main.js"/);
  assert.match(await read('server.js'), /'main'/);
  assert.match(await read('src/main.js'), /initializeUI/);
});
