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

    task.addEventListener("click", () => {
        task.contentEditable = "true"; // Make the task editable
        task.focus(); // Focus on the task for immediate editing
    });
    task.addEventListener("blur", () => task.contentEditable = false);

    checkbox.addEventListener("change", () => {

        if (checkbox.checked) {
            li.appendChild(deleteButton);
        } else {
            li.removeChild(deleteButton);
        }

        progressFunc();
    });

    task.addEventListener("input", () => {
        let tasks = [...document.querySelectorAll(".task")];
        if (tasks.every(task => task.textContent.trim().length > 0)) {
            setTimeout(() => {
                appendTask();
            }, 100);
            appendTask();
        }
        progressFunc();
    });

    taskList.appendChild(li);
}

appendTask();

let done = document.getElementById("done-task-count");
let total = document.getElementById("total-task-count");
function progressFunc() {
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




