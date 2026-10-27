export function createStorage(storage) {
  const key = 'curso-pswe-07.tasks';
  return {
    load() {
      const raw = storage.getItem(key);
      const tasks = raw === null ? [] : JSON.parse(raw);
      const ids = new Set();
      if (!Array.isArray(tasks) || !tasks.every(task => {
        if (!task || typeof task.id !== 'string' || !task.id.trim() || ids.has(task.id)
          || typeof task.title !== 'string' || !task.title.trim()
          || typeof task.description !== 'string' || typeof task.done !== 'boolean') return false;
        ids.add(task.id);
        return true;
      })) throw Error('Saved task data is invalid.');
      return tasks;
    },
    save: tasks => storage.setItem(key, JSON.stringify(tasks))
  };
}
