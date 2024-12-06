let input = document.getElementById("task-inp");
// let addBtn = document.getElementById("add-btn");
let taskList = document.getElementById("task-list");

function addTask() {
    if (input.value.trim() !== "") {

        let task = input.value;
        let li = document.createElement("li");
        li.innerText = task;
        li.contentEditable = true;

        li.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault(); // Stop default behavior
                input.focus(); // Bring focus back to input
            }
        });
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