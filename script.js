let inp = document.getElementById("task-inp");

inp.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        appendTask();
    }
});

inp.addEventListener("focus", () => {
    let tasks = document.querySelectorAll(".task");
    tasks.forEach(task => task.contentEditable = false);
});


function appendTask() {
    let taskList = document.getElementById("task-list");
    if (inp.value.trim() !== "") {
        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "checkbox"+Date.now();

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "✖";
        deleteButton.className = "delete-button";


        deleteButton.addEventListener("click", () => {
            li.remove();
        })
        let task = document.createElement("label");
        task.className = "task";
        // task.htmlFor = checkbox.id;
        task.innerText = inp.value;

        li.appendChild(checkbox);
        li.appendChild(task);

        task.addEventListener("click", () => {
            task.contentEditable = "true"; // Make the task editable
            task.focus(); // Focus on the task for immediate editing
            task.addEventListener("blur", () => task.contentEditable = false);
        });

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                li.appendChild(deleteButton);
            } else {
                li.removeChild(deleteButton);
            }
        });
        taskList.appendChild(li);
        inp.value = ""; // Clear the input after appending the task
    }
}





