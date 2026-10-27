import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initializeUI } from '../src/ui.js';
import { createTasks } from '../src/logic.js';

// A narrow control stub exercises real event handlers, not browser layout/HTML parsing.
function setup() {
  const controls = new Map();
  const root = {
    html: '',
    set innerHTML(value) { this.html = value; controls.clear(); },
    get innerHTML() { return this.html; }
  };
  const control = selector => {
    if (!controls.has(selector)) controls.set(selector, {
      value: '', textContent: '', focus() {}, setAttribute() {}
    });
    return controls.get(selector);
  };
  const oldDocument = globalThis.document;
  const oldWindow = globalThis.window;
  globalThis.document = {
    querySelector: selector => selector === '#app' ? root : control(selector),
    querySelectorAll: selector => {
      const key = selector === '[data-filter]' ? 'filter' : 'id';
      return [...root.html.matchAll(new RegExp(`data-${key}="([^"]+)"`, 'g'))].map(match => {
        const item = control(`${key}:${match[1]}`);
        item.dataset = { [key]: match[1] };
        return item;
      });
    }
  };
  globalThis.window = { confirm: () => false };
  let saved = [];
  let fail = false;
  const app = createTasks({ load: () => [], save(next) {
    if (fail) throw Error('blocked');
    saved = structuredClone(next);
  } });
  return {
    app, root, control,
    click: selector => control(selector).onclick(),
    submit: () => control('form').onsubmit({ preventDefault() {} }),
    fail: () => { fail = true; },
    saved: () => saved,
    restore() { globalThis.document = oldDocument; globalThis.window = oldWindow; }
  };
}

test('UI stories 1, 2, 3: create, validate, navigate, filter, cancel, edit and confirm deletion', () => {
  const s = setup();
  try {
    initializeUI(s.app);
    assert.match(s.root.html, /Curso-PSWE-07/);
    assert.match(s.root.html, /A fresh start/);
    s.click('#add');
    s.control('#title').value = '  ';
    s.submit();
    assert.equal(s.control('#title-error').textContent, 'Please enter a title.');
    assert.deepEqual(s.app.list(), []);
    s.control('#title').value = 'Read';
    s.control('#description').value = '';
    s.submit();
    const task = s.app.list()[0];
    assert.equal(task.done, false);
    s.click(`id:${task.id}`);
    assert.match(s.root.html, /No description/);
    assert.match(s.root.html, /Mark as done/);
    s.click('#toggle');
    assert.equal(s.app.get(task.id).done, true);
    assert.match(s.root.html, /Mark as not done/);
    s.click('#back');
    s.click('filter:Pending');
    assert.match(s.root.html, /No pending tasks/);
    s.click('filter:Done');
    assert.match(s.root.html, /class="task-row completed"/);
    s.click(`id:${task.id}`);
    s.click('#edit');
    assert.match(s.root.html, /value="Read"/);
    s.control('#title').value = 'Unsaved';
    s.click('#cancel');
    assert.equal(s.app.get(task.id).title, 'Read');
    s.click('#edit');
    s.control('#title').value = 'Read again';
    s.control('#description').value = 'Notes';
    s.submit();
    assert.equal(s.app.get(task.id).title, 'Read again');
    assert.equal(s.app.get(task.id).done, true);
    assert.match(s.root.html, /Notes/);
    s.click('#delete');
    assert.equal(s.app.list().length, 1);
    window.confirm = () => true;
    s.click('#delete');
    assert.equal(s.app.list().length, 0);
    s.click('#add');
    s.control('#title').value = 'Cancelled';
    s.click('#cancel');
    assert.equal(s.app.list().length, 0);
  } finally { s.restore(); }
});

test('UI story 4: failed save retains input and data; failed load is not an empty list', () => {
  const s = setup();
  try {
    initializeUI(s.app);
    s.click('#add');
    s.control('#title').value = 'Keep input';
    s.control('#description').value = 'Keep notes';
    s.fail();
    s.submit();
    assert.match(s.control('#error').textContent, /could not be saved/);
    assert.equal(s.control('#title').value, 'Keep input');
    assert.equal(s.control('#description').value, 'Keep notes');
    assert.deepEqual(s.app.list(), []);
    assert.deepEqual(s.saved(), []);
    initializeUI(undefined, Error('blocked'));
    assert.match(s.control('#error').textContent, /could not be loaded/);
    assert.doesNotMatch(s.root.html, /A fresh start/);
  } finally { s.restore(); }
});
