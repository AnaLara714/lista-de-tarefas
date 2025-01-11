const compAddTask = document.querySelector("#addTask");
const compInsertTask = document.querySelector("#insertTask");
const taskInput = document.querySelector(".write-task");
const taskList = document.querySelector(".tasks");
const message = document.querySelector(".organize-tasks");
const completeTasks = document.querySelector(".completed-task");
const titleCompletedList = document.querySelector(".title-completed-list");

let tasks = [];

taskInput.addEventListener("keyup", function (e) {
  var key = e.which || e.keyCode;
  if (key == 13) {
    addTask();
  }
});

function renderTask() {
  taskList.innerHTML = "";
  completeTasks.innerHTML = "";
  tasks.map((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "task completed" : "task pending";
    li.innerHTML = `
      <div>
        ${
          task.completed
            ? `<svg onclick="completeTask(${index})" xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#000'><path d='M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z'/></svg>`
            : `<svg onclick="completeTask(${index})" xmlns='http://www.w3.org/2000/svg' height='20px'  viewBox='0 -960 960 960'  width='20px'  fill='#000'      > <path d='M480.28-96Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z'  />  </svg> `
        }
        <span class="name-task ${task.completed ? "task-completed" : ""}" >${
      task.text
    }</span>
      </div>
      <div>
        <button class="edit-task" onclick="editTask(${index})">✏️</button>
        <button class="delete-task" onclick="
          deleteTask(${index})">🗑️</button>
      </div>
    `;

    task.completed ? completeTasks.appendChild(li) : taskList.appendChild(li);
  });

  tasks.filter((completed) => completed.completed == false).length > 0
    ? `${message.classList.add("hidden")} ${message.classList.add(
        "mobile-view"
      )}`
    : `${message.classList.remove("hidden")} `;

  tasks.filter((completed) => completed.completed == true).length > 0
    ? ` ${titleCompletedList.classList.remove(
        "hidden"
      )}  ${taskList.classList.add("scroll-tasks")}`
    : ` ${titleCompletedList.classList.add(
        "hidden"
      )} ${taskList.classList.remove(
        "scroll-tasks"
      )} ${message.classList.remove("mobile-view")}`;
}

function btnAddTask() {
  compAddTask.classList.add("hidden");
  compInsertTask.classList.remove("hidden");
  taskInput.focus();
}

function addTask() {
  compAddTask.classList.remove("hidden");
  compInsertTask.classList.add("hidden");

  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Por favor, digite uma tarefa.");
    taskInput.focus();
    return;
  }

  tasks.push({ text: taskText, completed: false });
  renderTask();
  taskInput.value = "";
}

function editTask(index) {
  const newTaskText = prompt("Edite a tarefa:", tasks[index].text);
  if (newTaskText !== null && newTaskText.trim() !== "") {
    tasks[index].text = newTaskText.trim();
    renderTask();
  }
  taskInput.disabled = false;
  taskInput.value = "";

  taskInput.focus();
}

function deleteTask(index) {
  if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
    tasks.splice(index, 1);
    renderTask();
  }
  taskInput.disabled = false;
  taskInput.value = "";
  taskInput.focus();
}

function completeTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTask();
}
