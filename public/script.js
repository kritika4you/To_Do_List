const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

loadTasks();

// Add a new task
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
        saveTasks();
    }
});

// Mark a task as complete
taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        deleteTask(event.target.parentNode);
        saveTasks();
    } else {
        const taskItem = event.target.closest('li');
        if (taskItem) {
            toggleTaskCompletion(taskItem);
            saveTasks();
        }
    }
});

// Functions
function addTask(taskText) {
    const taskItem = document.createElement('li');
    const taskLabel = document.createElement('span');
    const deleteButton = document.createElement('button');

    taskLabel.textContent = taskText;
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');

    taskItem.appendChild(taskLabel);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

function deleteTask(taskItem) {
    taskList.removeChild(taskItem);
}

function toggleTaskCompletion(taskItem) {
    taskItem.classList.toggle('completed');
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
        addTask(task.text);
        if (task.completed) {
            const taskItem = taskList.lastElementChild;
            toggleTaskCompletion(taskItem);
        }
    });
}

function saveTasks() {
    const tasks = Array.from(taskList.children).map((taskItem) => ({
        text: taskItem.firstChild.textContent,
        completed: taskItem.classList.contains('completed'),
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}