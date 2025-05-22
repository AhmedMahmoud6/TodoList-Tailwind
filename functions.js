let counter = 0; // acts like an id

function taskInfo(lightMode) {
  let infoHTML = `
    <div
      class="create-task fixed w-screen h-screen bg-black/50 top-0 flex justify-center items-center"
    >
      <div
        class="new-note ${
          lightMode ? `bg-white` : `bg-[#252525]`
        }  w-200 h-100 rounded-lg p-4 px-30 flex flex-col items-center justify-between outline-2 outline-white"
      >
        <div class="top-side flex flex-col gap-4 items-center w-full">
          <h2 class="${lightMode ? `text-black` : `text-white`}">NEW NOTE</h2>
          <input
            type="text"
            class="task-title placeholder-[#c3c1e5] ${
              lightMode ? `text-black` : `text-white`
            } outline-2 outline-[#6c63ff] w-full h-12 px-4 py-1 rounded focus-within:shadow-lg focus-within:shadow-indigo-500/50"
            placeholder="Input your note..."
          />
        </div>

        <div class="bottom-side flex justify-between w-full">
          <button
            class="cancel outline-2 outline-[#6c63ff] text-[#6c63ff] font-bold p-2 px-8 cursor-pointer hover:bg-[#6c63ff] hover:text-[white] rounded"
          >
            CANCEL
          </button>
          <button
            class="apply bg-[#6c63ff] text-white font-bold p-2 px-8 cursor-pointer hover:bg-[#7a70ff] hover:text-white rounded"
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
    `;
  document.body.insertAdjacentHTML("beforeend", infoHTML);
}

function removeTaskInfo() {
  try {
    document.querySelector(".create-task").remove();
  } catch (error) {}
}

function newTask(newTitle, tasksList) {
  counter += 1;

  let taskObj = {
    title: newTitle,
    status: "pending",
    id: counter,
  };
  tasksList.push(taskObj);
}

function renderTasks(taskList, filter = "all") {
  tasksContainer.innerHTML = "";
  let filteredTasks;

  if (filter === "all") {
    filteredTasks = taskList;
  } else if (filter === "pending") {
    filteredTasks = taskList.filter((task) => task.status === "pending");
  } else if (filter === "completed") {
    filteredTasks = taskList.filter((task) => task.status === "completed");
  }

  createTask(filteredTasks);
}

function createTask(taskList) {
  for (let i of taskList) {
    let taskHtml = `
              <div
                class="task group flex justify-between items-center border-b border-[#b1adfb] w-full h-12"
                id = ${i.id}
              >
                <label class="w-full h-full cursor-pointer flex items-center">
                  <div class="left-side flex items-center gap-4">
                  ${
                    i.status == "pending"
                      ? `<input type="checkbox" class="input-check form-checkbox h-5 w-5 text-blue-600 cursor-pointer peer"/>`
                      : `<input type="checkbox" class="input-check form-checkbox h-5 w-5 text-blue-600 cursor-pointer peer" checked/>`
                  }

                    <p class="title peer-checked:line-through peer-checked:text-[#8e8e8e] ${
                      lightMode ? `text-black` : `text-white`
                    }">
                      ${i.title}
                    </p>
                  </div>
                </label>
                <div class="right-side flex gap-4">
                  <div class="edit hidden group-hover:block cursor-pointer">
                    <i class="fa-solid fa-pen" style="color: #7972fe"></i>
                  </div>
                  <div class="delete hidden group-hover:block cursor-pointer">
                    <i class="fa-solid fa-trash" style="color: #ff6b6b"></i>
                  </div>
                </div>
              </div>
          `;
    tasksContainer.insertAdjacentHTML("beforeend", taskHtml);
  }
}

function searchTask(taskList, userInput) {
  let searchedTasks = [];
  searchedTasks = taskList.filter((searched) =>
    searched.title.startsWith(userInput)
  );
  renderTasks(searchedTasks);
}

function triggerMenu(filterMenu, menuOpened) {
  if (menuOpened) {
    filterMenu.style = "display: none;";
  } else {
    filterMenu.style = "display: flex;";
  }
}

function updateTitleColor(lightMode, tasksList) {
  let allTasks;
  if (tasksList.length > 0)
    allTasks = document.querySelectorAll(".task .title");

  if (lightMode)
    for (let i of allTasks) {
      i.classList.replace("text-white", "text-black");
    }
  else
    for (let i of allTasks) {
      i.classList.replace("text-black", "text-white");
    }
}

function changeTheme(tasksList, lightMode) {
  let allTasks;
  if (tasksList.length > 0)
    allTasks = document.querySelectorAll(".task .title");

  if (lightMode) {
    document.body.classList.replace("bg-white", "bg-[#252525]");
    document
      .querySelector(".parent h1")
      .classList.replace("text-black", "text-white");

    document
      .querySelector(".filtering input")
      .classList.replace("text-black", "text-white");

    // all tasks
    if (tasksList.length > 0)
      for (let i of allTasks) {
        i.classList.replace("text-black", "text-white");
      }
  } else {
    document.body.classList.replace("bg-[#252525]", "bg-white");
    document
      .querySelector(".parent h1")
      .classList.replace("text-white", "text-black");
    document
      .querySelector(".filtering input")
      .classList.replace("text-white", "text-black");

    // all tasks
    if (tasksList.length > 0)
      for (let i of allTasks) {
        i.classList.replace("text-white", "text-black");
      }
  }

  sessionStorage.setItem("theme", JSON.stringify(lightMode));
}
