// User Interface variables
const taskInput = document.querySelector('#task');
const addTaskButton = document.querySelector('#task-form');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    addTaskButton.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearButton.addEventListener('click', clearAllTasks);
    filter.addEventListener('keyup', filterTasks);
}

// Add Task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    } 

    // Create a list element using the tagname li
    const listElement = document.createElement('li');
    // 'collection-item' class is for Materialize
    listElement.className = 'collection-item';

    // Create text node and append it to listElement
    listElement.appendChild(document.createTextNode(taskInput.value));
    // Create link element ('a')
    const link = document.createElement('a');
    // Style it (with Materialize)
    link.className = 'delete-item secondary-content';
    // Add 'X - Delete' icon
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append the link (the icon) to listElement
    listElement.appendChild(link);
    
    // Append listElement to taskList
    taskList.appendChild(listElement);
    // Clear the input field
    taskInput.value = '';

    e.preventDefault();
}

// Clear one task
function removeTask(e) {
    // When clicking on the 'x' (the icon <i></i>), delete the parent of the parent (the relative list item)
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Do you really want to delete this task?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

// Clear all tasks
function clearAllTasks() {
    taskList.innerHTML = '';
}

// Filter tasks
function filterTasks(e) {
    // To make sure that the two compared chars match, we need to convert both either to lower or uppercase
    const textTyped = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(textTyped) != -1) {
            // if there is match, then show the task
            task.style.display = 'block';
        } else {
            // if there is not a match, then hide the task
            task.style.display = 'none';
        }
    });
}
