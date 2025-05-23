let counter = 0; // acts like an id

function textColor(lightMode) {
  return lightMode ? "text-black" : "text-white";
}
function bgColor(lightMode) {
  return lightMode ? "bg-white" : "bg-[#252525]";
}

function taskInfo(lightMode) {
  let infoHTML = `
    <div
      class="create-task fixed w-screen h-screen bg-black/50 top-0 flex justify-center items-center"
    >
      <div
        class="new-note ${bgColor(
          lightMode
        )}  w-200 h-100 rounded-lg p-4 px-30 max-[768px]:px-5 flex flex-col items-center justify-between outline-2 outline-white"
      >
        <div class="top-side flex flex-col gap-4 items-center w-full">
          <h2 class="${textColor(lightMode)}">NEW NOTE</h2>
          <input
            type="text"
            class="task-title placeholder-[#c3c1e5] ${textColor(
              lightMode
            )} outline-2 outline-[#6c63ff] w-full h-12 px-4 py-1 rounded focus-within:shadow-lg focus-within:shadow-indigo-500/50"
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
  document.querySelector(".task-title").focus();
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

function renderTasks(taskList, filter = "all", lightMode) {
  tasksContainer.innerHTML = "";

  const filteredTasks =
    filter === "all"
      ? taskList
      : taskList.filter((task) => task.status === filter);

  createTask(filteredTasks, lightMode);
}

function createTask(taskList, lightMode) {
  for (let i of taskList) {
    let taskHtml = `
              <div
                class="task group flex flex-shrink-0 justify-between items-center border-b border-[#b1adfb] w-full h-12"
                id = ${i.id}
              >
                <label class="h-full w-full cursor-pointer max-w-[calc(100%-85px)] flex items-center">
                  <div class="left-side overflow-hidden flex items-center w-full h-full gap-4">
                  ${
                    i.status == "pending"
                      ? `<input type="checkbox" class="input-check form-checkbox h-5 w-5 text-blue-600 cursor-pointer peer shrink-0"/>`
                      : `<input type="checkbox" class="input-check form-checkbox h-5 w-5 text-blue-600 cursor-pointer peer shrink-0" checked/>`
                  }

                    <p class="title truncate w-full peer-checked:line-through peer-checked:text-[#8e8e8e] ${textColor(
                      lightMode
                    )}">
                      ${i.title}
                    </p>
                  </div>
                </label>
                <div class="right-side m-3 flex gap-4">
                  <div class="edit hidden group-hover:block max-[768px]:block cursor-pointer">
                    <i class="fa-solid fa-pen" style="color: #7972fe"></i>
                  </div>
                  <div class="delete hidden group-hover:block max-[768px]:block cursor-pointer">
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
    searched.title.toLowerCase().startsWith(userInput.toLowerCase())
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
  const toggleClass = (selector, from, to) => {
    let element = document.querySelector(selector);
    if (element) element.classList.replace(from, to);
  };

  toggleClass("body", bgColor(lightMode), bgColor(!lightMode));
  toggleClass(".parent h1", textColor(lightMode), textColor(!lightMode));
  toggleClass(".filtering input", textColor(lightMode), textColor(!lightMode));

  if (tasksList.length > 0) {
    const allTasks = document.querySelectorAll(".task .title");
    for (let i of allTasks) {
      i.classList.replace(textColor(lightMode), textColor(!lightMode));
    }
  }

  sessionStorage.setItem("theme", JSON.stringify(!lightMode));
}
