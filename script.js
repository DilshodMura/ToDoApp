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
    const taskItem = event.target.parentElement.parentElement;
    taskList.removeChild(taskItem);
  } else if (event.target.classList.contains("edit-task")) {
    const taskItem = event.target.parentElement.parentElement;
    const taskText = taskItem.querySelector("span");
    const input = document.createElement("input");
    input.classList.add("edit-task");
    input.value = taskText.textContent;
    taskItem.replaceChild(input, taskText);
    event.target.textContent = "Save";
    event.target.classList.remove("edit-task");
    event.target.classList.add("save-task");
  } else if (event.target.classList.contains("save-task")) {
    const taskItem = event.target.parentElement.parentElement;
    const input = taskItem.querySelector("input");
    input.classList.add("input-task");    const span = document.createElement("span");
    span.textContent = input.value;
    taskItem.replaceChild(span, input);
    event.target.textContent = "Edit";
    event.target.classList.remove("save-task");
    event.target.classList.add("edit-task");
  }
});

addTaskButton.addEventListener("click", function() {
  const taskText = addTaskInput.value;
  if (!taskText) {
    alert("Please enter a task!");
    return;
  }
  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
    <span>${taskText}</span>
    <div class="task-actions">
      <button class="edit-task">Edit</button>
      <button class="delete-task">Delete</button>
    </div>
  `;
  taskList.appendChild(taskItem);
  addTaskInput.value = "";
});