import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createTasks } from '../src/logic.js';
import { createStorage } from '../src/persistence.js';

function setup() {
  const values = new Map();
  const storage = createStorage({ getItem: k => values.get(k) ?? null, setItem: (k, v) => values.set(k, v) });
  return { storage, app: createTasks(storage) };
}

test('Story 1: add, list and open tasks with optional description', () => {
  const { app } = setup();
  assert.deepEqual(app.list(), []);
  const task = app.add('  Read  ', 'Chapter one');
  assert.equal(app.get(task.id).title, 'Read');
  assert.equal(app.get(task.id).description, 'Chapter one');
  assert.equal(task.done, false);
  assert.equal(app.add('Walk').description, '');
  assert.equal(app.list().length, 2);
});
test('required title rejects empty and whitespace on add and edit', () => {
  const { app } = setup();
  for (const title of ['', '  ']) assert.throws(() => app.add(title), /title/i);
  const task = app.add('Read');
  assert.throws(() => app.edit(task.id, ' ', ''), /title/i);
  assert.equal(app.get(task.id).title, 'Read');
});
test('Story 2: toggle both ways and filter All, Pending, Done', () => {
  const { app } = setup();
  const task = app.add('Read');
  app.add('Walk');
  app.toggle(task.id);
  assert.equal(app.list('Done').length, 1);
  assert.equal(app.list('Pending').length, 1);
  assert.equal(app.list('All').length, 2);
  app.toggle(task.id);
  assert.equal(app.list('Done').length, 0);
});
test('Story 3: edit details, remove description and delete', () => {
  const { app } = setup();
  const task = app.add('Read', 'A book');
  app.edit(task.id, 'Walk', '');
  assert.equal(app.get(task.id).title, 'Walk');
  assert.equal(app.get(task.id).description, '');
  app.remove(task.id);
  assert.deepEqual(app.list(), []);
});
test('Story 4: latest edits, completion and deletions survive reopening', () => {
  const { app, storage } = setup();
  const task = app.add('Read');
  const removed = app.add('Remove');
  app.edit(task.id, 'Read again', 'Chapter two');
  app.toggle(task.id);
  app.remove(removed.id);
  const reopened = createTasks(storage);
  assert.deepEqual(reopened.list(), app.list());
  assert.equal(reopened.get(task.id).done, true);
});
test('failed persistence does not change reported state', () => {
  const app = createTasks({ load: () => [], save: () => { throw Error('Storage unavailable'); } });
  assert.throws(() => app.add('Read'), /Storage unavailable/);
  assert.deepEqual(app.list(), []);
});

test('duplicate titles remain independent and edits preserve Done and identity', () => {
  const { app } = setup();
  const first = app.add('Read');
  const second = app.add('Read');
  assert.notEqual(first.id, second.id);
  app.toggle(first.id);
  app.edit(first.id, ' Read again ', '');
  assert.deepEqual(app.get(first.id), { ...first, title: 'Read again', done: true });
  const copy = app.get(first.id);
  copy.title = 'Changed outside';
  app.list()[0].done = false;
  assert.equal(app.get(first.id).title, 'Read again');
  assert.equal(app.get(first.id).done, true);
  app.remove(first.id);
  assert.deepEqual(app.list(), [second]);
});
for (const operation of ['add', 'edit', 'toggle', 'remove']) {
  test(`failed ${operation} preserves both memory and persisted data`, () => {
    let saved = [];
    let fail = false;
    const app = createTasks({ load: () => structuredClone(saved), save(next) {
      if (fail) throw Error('write failed');
      saved = structuredClone(next);
    } });
    const task = app.add('Read', 'Notes');
    const before = app.list();
    fail = true;
    const actions = { add: () => app.add('Walk'), edit: () => app.edit(task.id, 'Changed', ''), toggle: () => app.toggle(task.id), remove: () => app.remove(task.id) };
    assert.throws(actions[operation], /write failed/);
    assert.deepEqual(app.list(), before);
    assert.deepEqual(saved, before);
  });
}
