$(document).ready(function(){
  $(".theme_icon").on('click', function(){
      $(this).toggleClass("flip fa-sun fa-moon");
      $("html").attr("data-theme", function(i, attr) {
        return attr === "dark" ? "light" : "dark";
      });
  });
});

const modeToggle = document.getElementById("mode-toggle");
const taskList = document.getElementById("task-list");
const addTaskInput = document.getElementById("add-task-input");
const addTaskButton = document.getElementById("add-task-button");
const editTaskButton = document.getElementById("edit-task-button");
const deletTaskButton = document.getElementById("delete-task-button");

document.addEventListener("DOMContentLoaded", localStorage);

//light and dark mode
modeToggle.addEventListener("click", function(event) {
  if (event.target.classList.contains("night-mode")) {
    document.body.style.backgroundColor = "#333";
    document.body.style.color = 'white';
    taskList.style.backgroundColor = "#444";
  } else if (event.target.classList.contains("light-mode")) {
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = 'black';
    taskList.style.backgroundColor = "#fff";
  }
});

taskList.addEventListener("click", function(event) {
  if (event.target.classList.contains("delete-task")) {
    deleteTask(event);
  } else if (event.target.classList.contains("edit-task")) {
    editTask(event);
  } else if (event.target.classList.contains("save-task")) {
    saveTask(event);
  }
});

function deleteTask(event) {
  const taskItem = event.target.parentElement.parentElement;
  taskList.removeChild(taskItem);

  tasks = taskList.querySelectorAll("li span");
  const taskValues = Array.from(tasks).map(task => ({
    taskText: task.textContent,
    timestamp: task.parentElement.querySelector(".task-date").textContent
  }));
  localStorage.setItem("tasks", JSON.stringify(taskValues));
}

function editTask(event) {
  const taskItem = event.target.parentElement.parentElement;
  if (taskItem) {
    const taskText = taskItem.querySelector("span");
    if (taskText) {
      const input = document.createElement("input");
      input.classList.add("edit-task");
      input.value = taskText.textContent;
      taskItem.replaceChild(input, taskText);
      event.target.textContent = "Save";
      event.target.classList.remove("edit-task");
      event.target.classList.add("save-task");
    }
  }
}

function saveTask(event) {
  const taskItem = event.target.parentElement.parentElement;
  if (taskItem) {
    const input = taskItem.querySelector("input.edit-task");
    if (input) {
      const span = document.createElement("span");
      span.textContent = input.value;
      taskItem.replaceChild(span, input);
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      event.target.textContent = "Edit";
      event.target.classList.remove("save-task");
      event.target.classList.add("edit-task");

      tasks = taskList.querySelectorAll("li span");
      const taskValues = Array.from(tasks).map(task => ({
        taskText: task.textContent,
        timestamp: task.parentElement.querySelector(".task-date").textContent
      }));
      localStorage.setItem("tasks", JSON.stringify(taskValues));
    }
  }
}

//local storage
const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  const taskValues = JSON.parse(storedTasks);
  taskValues.forEach(taskValue => {
    const taskItem = document.createElement("li");
    let checked = "";
    if (taskValue.completed) {
    checked = "checked";
    }
    taskItem.innerHTML = `
    <input type="checkbox" class="task-checkbox" ${checked}>
      <span class ="task-text">${taskValue.taskText}</span>
      <div class="task-date">${taskValue.timestamp}</div>
      <div class="task-actions">
        <button class= "edit-task" id ="edit-task-button">Edit</button>
        <button class="delete-task" id="delete-task-button">Delete
        </button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

//checkbox.
taskList.addEventListener("click", function(event) {
  const target = event.target;
  if (target.classList.contains("task-checkbox")) {
  const taskItem = target.parentElement;
  const taskStatus = target.checked ? "completed" : "incompleted";
  taskItem.querySelector("span").style.textDecoration = target.checked ? "line-through" : "none";
  if (taskStatus === "completed") {
    taskItem.innerHTML = `
    <input type="checkbox" class="task-checkbox" checked>
      <span class ="task-text" >${taskItem.querySelector("span").textContent}</span>
      <div class="task-date">${taskItem.querySelector(".task-date").textContent}</div>
    `;
  } else {
    taskItem.innerHTML = `
    <input type="checkbox" class="task-checkbox">
      <span class ="task-text">${taskItem.querySelector("span").textContent}</span>
      <div class="task-date">${taskItem.querySelector(".task-date").textContent}</div>
      <div class="task-actions">
        <button class="edit-task">Edit</button>
        <button class="delete-task">Delete</button>
      </div>
    `;
  }
  }
  });

//add tasks
addTaskButton.addEventListener("click", function() {
  const taskText = addTaskInput.value;
  if (!taskText) {
    alert("Please enter a task!");
    return;
  }
  const taskItem = document.createElement("li");
  const date = new Date();
  const timestamp = date.toLocaleString();
  taskItem.innerHTML = `
  <input type="checkbox" class="task-checkbox">
    <span class ="task-text">${taskText}</span>
    <div class="task-date">${timestamp}</div>
    <div class="task-actions">
    <button class= "edit-task" id ="edit-task-button">Edit</button>
    <button class="delete-task" id="delete-task-button">Delete</button>
    </div>
  `;
  taskList.appendChild(taskItem);
  addTaskInput.value = "";
  const tasks = taskList.querySelectorAll("li span");
  const taskValues = Array.from(tasks).map(task => ({
    taskText: task.textContent,
    timestamp: task.parentElement.querySelector(".task-date").textContent
  }));
  localStorage.setItem("tasks", JSON.stringify(taskValues));
});

//delete all tasks
const deleteAllTasksButton = document.querySelector("#deleteAllTasks");
deleteAllTasksButton.addEventListener("click", function() {
  const taskList = document.querySelector("#task-list");
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
});

//update local storage
function updateTaskStatus(taskText, taskTimestamp, status) {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
  let tasks = JSON.parse(storedTasks);
  tasks = tasks.map(task => {
  if (task.taskText === taskText && task.timestamp === taskTimestamp) {
  task.completed = status;
  }
  return task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  }
