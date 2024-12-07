const taskList = document.getElementById("task-list");
let tasks = document.querySelectorAll(".task");

tasks.forEach((task) => {
    task.addEventListener("click", () => {
        task.contentEditable = "true";
    });
})


taskList.addEventListener("input", (e) => {
    if (e.target.classList.contains("task") && e.target.innerText.trim() !== "") {
        let tasks = document.querySelectorAll(".task");
        // If the edited task is the last one, create a new empty task
        if (e.target === tasks[tasks.length - 1]) {
            let task = document.createElement("li");
            task.className = "task";
            task.addEventListener("click", () => {

                task.contentEditable = "true";
            });
            taskList.appendChild(task);
        }
    }
});

let startX = 0; // Track the starting touch position
let currentTask = null;

// Add touch e listeners to each task
taskList.addEventListener("touchstart", (e) => {
    if (e.target.classList.contains("task")) {
        startX = e.touches[0].clientX;
        currentTask = e.target;
    }
});


taskList.addEventListener("touchmove", (e) => {
    if (!currentTask) return;

    const touchX = e.touches[0].clientX;
    const deltaX = touchX - startX;

    // Move the task based on swipe distance
    if (deltaX < 0) {
        currentTask.style.transform = `translateX(${deltaX}px)`;
    }
});

taskList.addEventListener("touchend", (e) => {
    if (!currentTask) return;

    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchEndX - startX;

    // Check if swipe distance is sufficient to delete the task
    if (swipeDistance < -100) {
        currentTask.classList.add("removing");
        setTimeout(() => {
            currentTask.remove(); // Remove the task after animation
        }, 300);
    } else {
        // Reset position if swipe is too short
        currentTask.style.transform = "translateX(0)";
    }

    currentTask = null;
});

//* For Desktop
// const taskList = document.getElementById("task-list");
let isDragging = false;
// let startX = 0;
let taskBeingDragged = null;

taskList.addEventListener("mousedown", startDrag);
taskList.addEventListener("mousemove", drag);
taskList.addEventListener("mouseup", endDrag);
taskList.addEventListener("mouseleave", endDrag); // End drag if mouse leaves the task area

function startDrag(e) {
  // Start dragging on mouse down
  const task = e.target.closest(".task");
  if (task) {
    isDragging = true;
    startX = e.clientX; // Store initial X position
    taskBeingDragged = task;
    task.style.transition = "none"; // Remove transition for smooth dragging
  }
}

function drag(e) {
  if (!isDragging || !taskBeingDragged) return;

  // Calculate the difference in X position
  const deltaX = e.clientX - startX;

  // Update the task position by moving it horizontally
  taskBeingDragged.style.transform = `translateX(${deltaX}px)`;

  // If the task has moved halfway through the screen, mark it for removal
  if (Math.abs(deltaX) > -100) {
    taskBeingDragged.style.opacity = "0.5"; // Optional: visual feedback when the task is ready for removal
  } else {
    taskBeingDragged.style.opacity = "1"; // Reset opacity if not ready for removal
  }
}

function endDrag(e) {
  if (!isDragging || !taskBeingDragged) return;

  // Get the horizontal movement distance
  const deltaX = e.clientX - startX;

  // If the task has moved halfway through the screen, remove it
  if (Math.abs(deltaX) > 200) {
    taskBeingDragged.remove(); // Remove task if it's been swiped far enough
  } else {
    taskBeingDragged.style.transform = "translateX(0)"; // Reset the position if not swiped enough
  }

  // Reset dragging state
  taskBeingDragged.style.transition = "transform 0.3s ease"; // Smooth transition for reset
  taskBeingDragged = null;
  isDragging = false;
}



//* for tooltips

const btn_tooltip = document.querySelectorAll('.tooltip');

tooltipElements.forEach((element) => {
  // Show tooltip on tap (mobile)
  element.addEventListener('click', () => {
    element.classList.toggle('show-tooltip');
  });
});
