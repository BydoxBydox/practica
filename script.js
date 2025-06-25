let tasks = [];

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (text === "") return;

  tasks.push({
    id: Date.now(),
    description: text,
    completed: false
  });

  input.value = "";
  renderTasks();
}

function renderTasks(filter = 'all') {
  const list = document.getElementById('taskList');
  list.innerHTML = "";

  let filtered = tasks;
  if (filter === 'completed') {
    filtered = tasks.filter(t => t.completed);
  } else if (filter === 'pending') {
    filtered = tasks.filter(t => !t.completed);
  }

  filtered.forEach(task => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => toggleComplete(task.id);

    const span = document.createElement('span');
    span.textContent = task.description;

    const btn = document.createElement('button');
    btn.textContent = "Eliminar";
    btn.onclick = () => deleteTask(task.id);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.completed = !task.completed;
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

function filterTasks(state) {
  renderTasks(state);
}

function sortTasks() {
  tasks.sort((a, b) => a.description.localeCompare(b.description));
  renderTasks();
}
