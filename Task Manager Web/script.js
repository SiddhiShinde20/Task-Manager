// Get DOM elements
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTask');
const searchInput = document.getElementById('searchTask');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks
function displayTasks(filteredTasks = null) {
  taskList.innerHTML = '';
  const currentTasks = filteredTasks || tasks;

  if (currentTasks.length === 0) {
    taskList.innerHTML = '<p style="text-align:center; color:#333;">No tasks found!</p>';
    return;
  }

  currentTasks.forEach((task, index) => {
    taskList.innerHTML += `
      <div class="task-card ${task.completed ? 'completed' : ''}">
        <h3>${task.name}</h3>
        <p>Category: ${task.category}</p>
        <p>Due: ${task.date}</p>
        <p>Status: ${task.completed ? 'Completed' : 'Pending'}</p>
        <div>
          <button onclick="toggleComplete(${index})">Toggle Complete</button>
          <button onclick="deleteTask(${index})">Delete</button>
        </div>
      </div>
    `;
  });
}

// Add task
function addTask() {
  const name = document.getElementById('taskName').value.trim();
  const date = document.getElementById('taskDate').value;
  const category = document.getElementById('taskCategory').value;

  if (name === '' || date === '') {
    alert('Please enter task name and due date.');
    return;
  }

  tasks.push({ name, date, category, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();

  document.getElementById('taskName').value = '';
  document.getElementById('taskDate').value = '';
}

addTaskBtn.addEventListener('click', addTask);

// Delete task
function deleteTask(index) {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
  }
}

// Toggle complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
}

// Search task
function searchTask() {
  const query = searchInput.value.toLowerCase();
  const filtered = tasks.filter(task => task.name.toLowerCase().includes(query));
  displayTasks(filtered);
}

// Initial display
displayTasks();