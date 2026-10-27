


export function initializeUI(tasks, loadError = null) {
const root = document.querySelector('#app');

let filter = 'All';

const escape = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function error(message) {
  document.querySelector('#error').textContent = message;
}
function attempt(action) {
  try { action(); } catch { error('Your change could not be saved. Please check browser storage and try again.'); }
}
function frame(content) {
  root.innerHTML = `<div class="app-shell">${content}<p id="error" class="error" role="alert"></p></div>`;
}
function list() {

  const visible = tasks.list(filter);
  const hasTasks = tasks.list().length > 0;
  frame(`<header><div><p class="eyebrow">A LITTLE SPACE FOR YOUR DAY</p><h1>Curso-PSWE-07</h1><p class="subtitle">One task at a time.</p></div><button class="primary" id="add">+ Add task</button></header>
    <nav class="filters" aria-label="Filter tasks">${['All', 'Pending', 'Done'].map(value => `<button aria-pressed="${filter === value}" data-filter="${value}">${value}</button>`).join('')}</nav>
    <section aria-label="Tasks" class="task-list">${visible.length ? visible.map(task => `<button class="task-row ${task.done ? 'completed' : ''}" data-id="${task.id}"><span class="indicator" aria-label="${task.done ? 'Done' : 'Pending'}">${task.done ? '✓' : ''}</span><span class="task-title">${escape(task.title)}</span><span class="chevron" aria-hidden="true">›</span></button>`).join('') : `<div class="empty"><span class="empty-icon" aria-hidden="true">✓</span><h2>${hasTasks ? `No ${filter.toLowerCase()} tasks` : 'A fresh start'}</h2><p>${hasTasks ? 'Nothing here for now. Try another filter.' : 'Make a little room for what matters.<br>Add your first task to get started.'}</p></div>`}</section>`);
  document.querySelector('#add').onclick = () => form();
  document.querySelectorAll('[data-filter]').forEach(button => button.onclick = () => { filter = button.dataset.filter; list(); });
  document.querySelectorAll('[data-id]').forEach(button => button.onclick = () => detail(button.dataset.id));
}
function detail(id) {

  const task = tasks.get(id);
  frame(`<button id="back" class="back">← Back to tasks</button><article class="detail"><span class="status">${task.done ? 'Done' : 'Pending'}</span><h1>${escape(task.title)}</h1><p class="description ${task.description ? '' : 'muted'}">${escape(task.description || 'No description')}</p><div class="actions"><button class="primary" id="toggle">${task.done ? 'Mark as not done' : 'Mark as done'}</button><button id="edit">Edit</button><button class="danger" id="delete">Delete</button></div></article>`);
  document.querySelector('#back').onclick = list;
  document.querySelector('#edit').onclick = () => form(id);
  document.querySelector('#toggle').onclick = () => attempt(() => { tasks.toggle(id); detail(id); });
  document.querySelector('#delete').onclick = () => {
    if (window.confirm('Delete this task? This cannot be undone.')) attempt(() => { tasks.remove(id); list(); });
  };
}
function form(id = null) {
  const task = id ? tasks.get(id) : { title: '', description: '' };
  frame(`<button id="back" class="back">← ${id ? 'Back to task' : 'Back to tasks'}</button><section class="detail"><p class="eyebrow">${id ? 'MAKE AN ADJUSTMENT' : 'MAKE A LITTLE PROGRESS'}</p><h1>${id ? 'Edit task' : 'Add task'}</h1><form novalidate><label for="title">Title <span class="muted">(required)</span></label><input id="title" name="title" value="${escape(task.title)}" required aria-describedby="title-error"><p id="title-error" class="error" role="alert"></p><label for="description">Description <span class="muted">(optional)</span></label><textarea id="description" name="description" rows="5">${escape(task.description)}</textarea><div class="actions"><button class="primary" type="submit">Save</button><button type="button" id="cancel">Cancel</button></div></form></section>`);
  const cancel = () => id ? detail(id) : list();
  document.querySelector('#back').onclick = cancel;
  document.querySelector('#cancel').onclick = cancel;
  const title = document.querySelector('#title');
  title.focus();
  document.querySelector('form').onsubmit = event => {
    event.preventDefault();
    if (!title.value.trim()) {
      document.querySelector('#title-error').textContent = 'Please enter a title.';
      title.setAttribute('aria-invalid', 'true');
      title.focus();
      return;
    }
    attempt(() => {
      const description = document.querySelector('#description').value;
      if (id) { tasks.edit(id, title.value, description); detail(id); }
      else { tasks.add(title.value, description); filter = 'All'; list(); }
    });
  };
}
if (!loadError) {
  list();
} else {
  frame('<h1>Curso-PSWE-07</h1>');
  error('Tasks could not be loaded. Please enable browser storage and reload.');
}

}

