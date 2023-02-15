const addTaskInput = document.getElementById("add-task-input");
const addTaskButton = document.getElementById("add-task-button");
const editTaskButton = document.getElementById("edit-task-button");
const deletTaskButton = document.getElementById("delete-task-button");
const taskList = document.getElementById("task-list");

function renderTasks() {
  taskList.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.id = `task-${task.id}`;
    taskItem.innerHTML = `
      <span class="task-text">${task.taskText}</span>
      <div class="task-date">${task.timestamp}</div>
      <div class="task-actions">
        <button class="edit-task" id="edit-task-button-${task.id}">Edit</button>
        <button class="save-task" id="save-task-button-${task.id}">Save</button>
        <button class="delete-task" id="delete-task-button-${task.id}">Delete</button>
      </div>
    `;
    taskList.appendChild(taskItem);
    const editTaskButton = taskItem.querySelector(`#edit-task-button-${task.id}`);
    const saveTaskButton = taskItem.querySelector(`#save-task-button-${task.id}`);
    const deleteTaskButton = taskItem.querySelector(`#delete-task-button-${task.id}`);
    editTaskButton.addEventListener("click", editTask);
    saveTaskButton.addEventListener("click", saveTask);
    deleteTaskButton.addEventListener("click", deleteTask);
  });
}
//add tasks
function addTask(event) {
  const taskText = addTaskInput.value;
  if (!taskText) {
    alert("Please enter a task!");
    return;
  }
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const date = new Date();
  const timestamp = date.toLocaleString();
  const newTask = {
    id: tasks.length + 1,
    taskText: taskText,
    timestamp: timestamp
  };
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  addTaskInput.value = "";
  renderTasks();
}

function editTask(event) {
  const target = event.target;
  const taskItem = target.closest("li");
  const taskText = taskItem.querySelector(".task-text");
  taskText.contentEditable = true;
  target.id = `save-task-button-${taskItem.id.split("-")[1]}`;
}
function deleteTask(event) {
  const taskId = event.target.parentElement.parentElement.id;
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskIndex = tasks.findIndex(task => `task-${task.id}` === taskId);
  tasks.splice(taskIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
function saveTask(event) {
  const target = event.target;
  const taskItem = target.closest("li");
  const taskText = taskItem.querySelector(".task-text");
  const taskId = taskItem.id.split("-")[1];
  taskText.contentEditable = false;
  target.textContent = "Edit";
  target.classList.remove("save-task");
  target.classList.add("edit-task");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId));
  tasks[taskIndex].taskText = taskText.textContent;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
function deleteAllTasks() {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
}

addTaskButton.addEventListener("click", addTask);
deletTaskButton.addEventListener("click", deleteAllTasks);

renderTasks();