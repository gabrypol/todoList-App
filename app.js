// User Interface variables
const taskInput = document.querySelector('#task');
const addTaskButton = document.querySelector('#task-form');
const filter = document.querySelector('#filter');
const taskTitle = document.querySelector('#task-title');
const taskOriginalTitleText = taskTitle.textContent;
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');

// Update the task counter. const can't be used here, because the variable is re-assigned each time the function updateTaskCounter() is called
let taskCounter = 0;
function updateTaskCounter() {
    taskCounter = taskList.childElementCount;
}

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
        // If the input field is empty show the alert...
        alert('Please add a task.');
        // ... and prevent from an empty task being added to the list
        
    } else {
        // Create a list element using the tagname li
        const listElement = document.createElement('li');
        // 'collection-item' class is for Materialize
        listElement.className = 'collection-item blue lighten-4';

        // Create text node and append it to listElement
        listElement.appendChild(document.createTextNode(taskInput.value));
        // Create link element ('a')
        const link = document.createElement('a');
        // Style it (with Materialize)
        link.className = 'delete-item secondary-content';
        // Add 'X - Delete' icon
        link.innerHTML = '<i class="fa fa-remove black-text"></i>'
        // Append the link (the icon) to listElement
        listElement.appendChild(link);
        
        // Append listElement to taskList
        taskList.appendChild(listElement);
        // Clear the input text field
        taskInput.value = '';

        // Update the global variable taskCounter
        updateTaskCounter();

        // Update the header 'h5'. If in 'taskTitle' there is more than one task, add an 's' to the word 'Task' in h5
        taskTitle.textContent = `${taskCounter} Task${taskCounter == 1 ? '' : 's'}:`;

        // Enable 'CLEAR TASKS' button, which was originally disabled
        clearButton.classList.remove('disabled'); 
    }
    e.preventDefault();
}

// Clear one task
function removeTask(e) {
    // When clicking on the 'x' (the icon <i></i>), delete the parent of the parent (the relative list item)
    if(e.target.parentElement.classList.contains('delete-item')) {
        // Ask confirmation
        if(confirm('Do you want to delete this task?')) {
            e.target.parentElement.parentElement.remove();

            // Update the global variable taskCounter
            updateTaskCounter();

            // Update the header 'h5'. If there are no tasks left, restore taskTitle to the original text. If there are more than one task, add an 's' to the word 'Task' in h5
            if (taskCounter == 0) {
                taskTitle.textContent = taskOriginalTitleText;
            } else {
                taskTitle.textContent = `${taskCounter} Task${taskCounter == 1 ? '' : 's'}:`;
            }
        }
    }
    // If there are no tasks on the list, disable the button 'CLEAR TASKS'
    if(taskList.childElementCount == 0) {
        clearButton.classList.add('disabled');
    }
}

// Clear all tasks
function clearAllTasks() {
    if(confirm('Do you really want to delete all your tasks?')) {
        // Remove the whole 'ul'
        taskList.innerHTML = '';

        // Update the global variable taskCounter
        updateTaskCounter();

        // Restore taskTitle to the original text
        taskTitle.textContent = taskOriginalTitleText;

        // Disable 'CLEAR TASKS' button, which has been enabled while inserting tasks
        clearButton.classList.add('disabled');
    } 
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
