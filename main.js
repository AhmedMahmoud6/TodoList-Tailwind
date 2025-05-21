let addTasks = document.querySelector(".add-task");
let tasksContainer = document.querySelector(".tasks-container");
let searchNote = document.querySelector(".search");
let tasksList;
if (JSON.parse(sessionStorage.getItem("taskList"))) {
  tasksList = JSON.parse(sessionStorage.getItem("taskList"));
} else {
  tasksList = [];
}

renderTasks(tasksList);

document.addEventListener("click", (e) => {
  // change status
  if (e.target.classList.contains("input-check")) {
    let taskId = e.target.closest(".task").id;
    for (let i of tasksList) {
      if (i.id == taskId) {
        e.target.checked ? (i.status = "completed") : (i.status = "pending");
        break;
      }
    }
    sessionStorage.setItem("taskList", JSON.stringify(tasksList));
  }
  // confirm creating task
  if (
    e.target.classList.contains("apply") &&
    document.querySelector(".task-title").value != ""
  ) {
    let taskTitle = document.querySelector(".task-title").value;
    newTask(taskTitle, tasksList);
    renderTasks(tasksList);
    removeTaskInfo();
    sessionStorage.setItem("taskList", JSON.stringify(tasksList));
  }

  // close task creation form
  if (
    e.target.classList.contains("create-task") ||
    e.target.classList.contains("cancel")
  ) {
    removeTaskInfo();
  }

  // remove task
  try {
    if (
      e.target.classList.contains("delete") ||
      e.target.parentElement.classList.contains("delete")
    ) {
      let taskId = e.target.closest(".task").id;
      for (let i = 0; i < tasksList.length; i++) {
        if (tasksList[i].id == taskId) {
          tasksList.splice(i, 1);
        }
      }
      sessionStorage.setItem("taskList", JSON.stringify(tasksList));
      renderTasks(tasksList);
    }
  } catch (err) {}

  // edit task
  try {
    if (
      e.target.classList.contains("edit") ||
      e.target.parentElement.classList.contains("edit")
    ) {
      // updating the title with input field
      let currentTaskId = e.target.closest(".task").id;
      let taskContainer = e.target.closest(".task").querySelector(".left-side");
      let taskP = taskContainer.querySelector("p");
      let newInput = document.createElement("input");
      newInput.value = taskP.innerText;
      newInput.className = "border px-2 py-1 rounded";
      taskContainer.replaceChild(newInput, taskP);

      // updating the title when pressing enter key
      document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          let newTaskP = document.createElement("p");
          newTaskP.textContent = newInput.value;
          newTaskP.className =
            "title peer-checked:line-through peer-checked:text-[#8e8e8e]";
          taskContainer.replaceChild(newTaskP, newInput);

          for (let i of tasksList) {
            if (i.id == currentTaskId) {
              i.title = newInput.value;
            }
          }
        }
        sessionStorage.setItem("taskList", JSON.stringify(tasksList));
      });
    }
  } catch (err) {}
});

// open task creation form
addTasks.addEventListener("click", (_) => {
  taskInfo();
});

// serach task
searchNote.addEventListener("input", (_) => {
  if (searchNote.value == "") {
    renderTasks(tasksList);
  } else {
    searchTask(tasksList, searchNote.value);
  }
});
