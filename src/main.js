import { createTasks } from './logic.js';
import { createStorage } from './persistence.js';
import { initializeUI } from './ui.js';

let tasks;
let loadError;
try {
  tasks = createTasks(createStorage(window.localStorage));
} catch (error) {
  loadError = error;
}
initializeUI(tasks, loadError);
