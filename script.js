let input = document.getElementById("task-inp");
// let addBtn = document.getElementById("add-btn");
let taskList = document.getElementById("task-list");

function addTask() {
    if (input.value.trim() !== "") {
        // gather data
        let task = input.value;
        let li = document.createElement("li");
        let span = document.createElement("span");
        li.innerHTML = task;
        li.appendChild(span);

        // make it editable
        li.addEventListener("dblclick", () => {
            li.contentEditable = true;
        });
        li.addEventListener("blur", () => {
            li.contentEditable = false;
        });
        li.addEventListener("click", (e) => {
            // li.style.textDecoration = "line-through";
            li.classList.toggle("checked");
            e.target.querySelector("span").classList.toggle("draw");
        });
        // append it
        taskList.appendChild(li);
        input.value = "";
        console.log(task);
    }
}

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});
input.addEventListener("blur", () => {
    addTask();
});
