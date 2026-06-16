let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function addTask() {

    const input =
        document.getElementById("taskInput");

    const text =
        input.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    input.value = "";

    renderTasks();
}

function deleteTask(index) {

    tasks.splice(index, 1);

    renderTasks();
}

function toggleTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    renderTasks();
}

function editTask(index) {

    const updatedTask = prompt(
        "Edit Task:",
        tasks[index].text
    );

    if (
        updatedTask !== null &&
        updatedTask.trim() !== ""
    ) {

        tasks[index].text =
            updatedTask.trim();

        renderTasks();
    }
}

function updateStats() {

    document.getElementById("total")
        .innerText = tasks.length;

    document.getElementById("completed")
        .innerText =
        tasks.filter(
            task => task.completed
        ).length;

    document.getElementById("pending")
        .innerText =
        tasks.filter(
            task => !task.completed
        ).length;
}

function renderTasks() {

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li =
            document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="actions">

                <button onclick="toggleTask(${index})">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button onclick="editTask(${index})">
                    Edit
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });

    updateStats();
    saveTasks();
}

document
.getElementById("themeBtn")
.addEventListener("click", () => {

    document.body.classList.toggle("dark");
});

renderTasks();