let tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function detectPriority(text){

    const highPriorityKeywords = [
        "project",
        "assignment",
        "exam",
        "interview",
        "meeting",
        "deadline",
        "code",
        "study"
    ];

    text = text.toLowerCase();

    if(
        highPriorityKeywords.some(
            keyword => text.includes(keyword)
        )
    ){
        return "High";
    }

    return "Normal";
}

function addTask(){

    const input =
        document.getElementById("taskInput");

    const text =
        input.value.trim();

    if(text === ""){

        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text:text,
        completed:false,
        priority:detectPriority(text)
    });

    input.value="";

    renderTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    renderTasks();
}

function toggleTask(index){

    tasks[index].completed =
        !tasks[index].completed;

    renderTasks();
}

function editTask(index){

    const updatedTask = prompt(
        "Edit Task",
        tasks[index].text
    );

    if(
        updatedTask &&
        updatedTask.trim() !== ""
    ){

        tasks[index].text =
            updatedTask.trim();

        tasks[index].priority =
            detectPriority(updatedTask);

        renderTasks();
    }
}

function updateStats(){

    const total =
        tasks.length;

    const completed =
        tasks.filter(
            task => task.completed
        ).length;

    const pending =
        total - completed;

    document.getElementById("total")
        .innerText = total;

    document.getElementById("completed")
        .innerText = completed;

    document.getElementById("pending")
        .innerText = pending;

    const score =
        total === 0
        ? 0
        : Math.round(
            (completed / total) * 100
        );

    document.getElementById("score")
        .innerText = score + "%";
}

function generateAIAdvice(){

    const productiveTasks =
        tasks.filter(
            task =>
                task.priority === "High"
        ).length;

    let advice = "";

    if(tasks.length === 0){

        advice =
        "No tasks added yet. Start planning your day.";

    } else if(productiveTasks >= 3){

        advice =
        "Excellent focus. You have several high-priority tasks scheduled.";

    } else if(productiveTasks >= 1){

        advice =
        "Good balance. Complete your high-priority tasks before lower-priority activities.";

    } else {

        advice =
        "Consider adding study, project, or career-related goals to improve productivity.";
    }

    document.getElementById("aiAdvice")
        .innerText = advice;
}

function renderTasks(){

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const li =
            document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
            <div>
                ${task.text}
                <span class="priority">
                    (${task.priority} Priority)
                </span>
            </div>

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
    generateAIAdvice();
    saveTasks();
}

document
.getElementById("themeBtn")
.addEventListener("click", () => {

    document.body.classList.toggle("dark");
});

renderTasks();