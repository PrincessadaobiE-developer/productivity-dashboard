let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
        ${task.text}
        <div>
            <button onclick="toggleTask(${index})">
                ${task.completed ? "Undo" : "Done"}
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

function addTask(){

    const input = document.getElementById("taskInput");

    if(input.value.trim() === "") return;

    tasks.push({
        text: input.value,
        completed:false
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

function updateStats(){

    document.getElementById("total").innerText =
        tasks.length;

    document.getElementById("completed").innerText =
        tasks.filter(task=>task.completed).length;

    document.getElementById("pending").innerText =
        tasks.filter(task=>!task.completed).length;
}

renderTasks();