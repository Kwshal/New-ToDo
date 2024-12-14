let taskList = document.getElementById("task-list");

function appendTask() {
    let taskList = document.getElementById("task-list");
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox" + Date.now();

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "✖";
    deleteButton.className = "delete-button";


    deleteButton.addEventListener("click", () => {
        li.remove();
        if (taskList.children.length === 0) {
            appendTask();
            done.innerText = 0;
            total.innerText = 0;
        }
    })
    let task = document.createElement("label");
    task.className = "task";
    // task.htmlFor = checkbox.id;
    // task.innerText = inp.value;

    li.appendChild(checkbox);
    li.appendChild(task);

    task.addEventListener("click", makeEditable);
    function makeEditable() {
        task.contentEditable = "true"; // Make the task editable
        task.focus(); // Focus on the task for immediate editing
        return task.contentEditable;
    }
    task.addEventListener("blur", () => !makeEditable);

    checkbox.addEventListener("change", () => {
        if (task.textContent.trim().length === 0) {
            checkbox.checked = false; // Prevent striking through empty tasks
            return;
        }

        if (checkbox.checked) {
            li.appendChild(deleteButton);
            task.contentEditable = false;
            task.removeEventListener("click", makeEditable)
        } else {
            li.removeChild(deleteButton);
            task.contentEditable = true;
            task.addEventListener("click", makeEditable)
        }

        updateProgress();
    });

    task.addEventListener("input", () => {
        let tasks = [...document.querySelectorAll(".task")];
        if (tasks.every(task => task.textContent.trim().length > 0)) {
            setTimeout(() => {
                appendTask();
            }, 100);
            appendTask();
        }
        updateProgress();
    });

    taskList.appendChild(li);
}

appendTask();

let done = document.getElementById("done-task-count");
let total = document.getElementById("total-task-count");
function updateProgress() {
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

    // console.log(countDone, countTotal);
}


document.getElementById("main").addEventListener("click", () => {
    // add new task when no empty task
    let tasks = Array.from(document.querySelectorAll(".task")); // get all taskList
    if (tasks.every(task => task.textContent.trim().length > 0) && taskList.children.length > 0) {
        setTimeout(() => {
            appendTask();
        }, 100);
        appendTask();
    }
    updateProgress();
});

