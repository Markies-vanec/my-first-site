const button = document.getElementById("greet");
const message = document.getElementById("message");
let count = 0;
button.addEventListener("click", function () {
    count++;
    message.textContent = "You clicked " + count + " times.";
});
const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function () {
    count = 0;
    message.textContent = "counter reset.";
});
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addTask");
const tasklist = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks(){
    tasklist.innerHTML = "";
    tasks.forEach(function (text, index){
        const item = document.createElement("li");
        item.textContent = text + " ";
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        item.appendChild(removeButton);
        tasklist.appendChild(item);
    });
    }
    function addTask(){
        const text = taskInput.value.trim();
        if (text === "") {
            return;
        }
        tasks.push(text);
        saveTasks();
        renderTasks();
        taskInput.value = " ";
}
addButton.addEventListener("click", addTask);
renderTasks();