import { db, ref, push, onValue, remove, update, set, get } from "./firebase.js";

//? set(ref(db, "tasks/1"), { name: "Example Task", done: false });

// const dbref = ref(db, "tasks");
// onValue(dbref, (snapshot) => {
//     let tasks = snapshot.val();
//     // console.log(tasks);
//     let keys = Object.keys(tasks);
//     // console.log(keys);
//     let values = Object.values(tasks);
//     // console.log(values);
//     for (let i = 0; i < keys.length; i++) {
//         let key = keys[i];
//         let value = values[i];
//         // console.log(key, value);
//         let li = document.createElement("li");
//         let checkbox = document.createElement("input");
//         checkbox.type = "checkbox";
//         checkbox.checked = value.done;
//         li.appendChild(checkbox);
//         let task = document.createElement("label");
//         task.className = "task";
//         task.innerText = value.name;
//         li.appendChild(task);
//         let deleteButton = document.createElement("button");
//         deleteButton.innerText = "✖";
//         deleteButton.className = "delete-button";
//         li.appendChild(deleteButton);
//         taskList.appendChild(li);
//     }
// });
document.addEventListener("DOMContentLoaded", async () => {
    const snapshot = await getTasks();
    if (snapshot) renderTasks(snapshot);
});

async function getTasks() {
    try {
        const snapshot = await get(ref(db, "tasks")); // get the tasks from the database
        return snapshot.exists() ? snapshot.val() : {}; // return the tasks if they exist, otherwise return an empty object
    } catch (error) {
        console.error("error fetching tasks", error);
        return {};
    }
}
function renderTasks(tasks) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // clear the task list

    Object.entries(tasks).forEach(([key, value]) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = value.done;
        li.appendChild(checkbox);
        const task = document.createElement("label");
        task.className = "task";
        task.innerText = value.name;
        li.appendChild(task);
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "✖";
        deleteButton.className = "delete-button";
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
    addNewTask();
}

let done = document.getElementById("done-task-count");
let total = document.getElementById("total-task-count");
let taskList = document.getElementById("task-list");

function addNewTask(firstTask = false) {
    let taskList = document.getElementById("task-list");

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.onchange = updateTasks;

    let task = document.createElement("label");
    task.className = "task";
    ensureAtleastOneTask(task);

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "✖";
    deleteButton.className = "delete-button";
    deleteButton.style.display = "none";

    li.appendChild(checkbox);
    li.appendChild(task);
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    done.innerText = 0;
    total.innerText = 0;
}

taskList.addEventListener("click", (e) => {
    let task = e.target.classList.contains("task");
    let deleteButton = e.target.classList.contains("delete-button");
    let checkbox = e.target.classList.contains("task-checkbox");
    if (task) {
        makeEditable(e.target);
    } else if (deleteButton) {
        updateTasks();
        e.target.parentElement.remove(); // remove the li
        taskList.children.length === 0 && addNewTask(); // append a new task if there are no tasks
    } else if (checkbox) {
        let checkbox = e.target;
        let li = checkbox.parentElement;
        let task = li.querySelector(".task");
        let deleteButton = li.querySelector(".delete-button");

        if (task.textContent.trim().length === 0) {
            checkbox.checked = false;
            return;
        }

        if (checkbox.checked) {
            deleteButton.style.display = "flex";
            task.contentEditable = false;
            task.removeEventListener("click", makeEditable);
        } else {
            deleteButton.style.display = "none";
            task.contentEditable = true;
            task.addEventListener("click", makeEditable);
        }
        updateTasks();
    }
});

function ensureAtleastOneTask(task) {
    task.addEventListener("input", () => {
        let tasks = [...document.querySelectorAll(".task")];
        if (tasks.length === 0) {
            addNewTask(true);
        } else if (tasks.every(task => task.textContent.trim().length > 0)) {
            addNewTask(false);
        }
        updateTasks();
    });
}

function makeEditable(task) {
    task.contentEditable = "true";
    task && task.focus();
}

function updateTasks() {
    let countDone = 0;
    let tasks = [...document.querySelectorAll(".task")];


    tasks.forEach(task => {
        let checkbox = task.parentElement.querySelector("input[type='checkbox']");
        if (checkbox && checkbox.checked && task.textContent.trim().length > 0) {
            countDone++;
        }
        // console.log(checkbox);
    });
    done.innerText = countDone;


    let countTotal = tasks.filter(task => task.textContent.trim().length > 0).length;
    total.innerText = countTotal;

    if (countTotal === countDone && countTotal > 0) {
        done.style.color = "var(--maroon-muted)";
        total.style.color = "var(--maroon-muted)";
    } else {
        done.style.color = "var(--maroon-soft)";
        total.style.color = "var(--maroon-soft)";
    }
}



