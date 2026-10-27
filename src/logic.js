export function createTasks(storage) {
  let tasks = storage.load();
  function commit(next) {
    storage.save(next);
    tasks = next;
  }
  function fields(title, description = '') {
    if (!title.trim()) throw Error('Please enter a title.');
    return { title: title.trim(), description: description.trim() };
  }
  function update(id, change) {
    commit(tasks.map(task => task.id === id ? { ...task, ...change(task) } : task));
  }
  return {
    list: (filter = 'All') => tasks.filter(task => filter === 'All' || task.done === (filter === 'Done')).map(task => ({ ...task })),
    get: id => ({ ...tasks.find(task => task.id === id) }),
    add(title, description) {
      const task = { id: crypto.randomUUID(), ...fields(title, description), done: false };
      commit([...tasks, task]);
      return { ...task };
    },
    edit: (id, title, description) => update(id, () => fields(title, description)),
    toggle: id => update(id, task => ({ done: !task.done })),
    remove: id => commit(tasks.filter(task => task.id !== id))
  };
}
