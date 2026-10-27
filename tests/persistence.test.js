import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createStorage } from '../src/persistence.js';

const valid = { id: 'one', title: 'Read', description: '', done: false };
function adapter(raw) {
  return createStorage({ getItem: () => raw, setItem: () => assert.fail('load must not write') });
}
test('missing key is empty and valid tasks load', () => {
  assert.deepEqual(adapter(null).load(), []);
  assert.deepEqual(adapter(JSON.stringify([valid])).load(), [valid]);
});
for (const raw of ['', '{', '{}', 'null', '[null]', JSON.stringify([valid, valid]), ...[
  { id: '' }, { id: 12 }, { title: ' ' }, { title: null }, { description: 3 }, { done: 'false' }
].map(change => JSON.stringify([{ ...valid, ...change }]))]) {
  test(`invalid stored data rejected without writing: ${raw}`, () => assert.throws(() => adapter(raw).load()));
}
test('unavailable reads and writes propagate errors', () => {
  const storage = createStorage({ getItem() { throw Error('blocked'); }, setItem() { throw Error('quota'); } });
  assert.throws(() => storage.load(), /blocked/);
  assert.throws(() => storage.save([valid]), /quota/);
});
