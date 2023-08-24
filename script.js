const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const toggleButton = document.getElementById('toggleButton');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks(status = 'all') {
  taskList.innerHTML = '';

  let filteredTasks = tasks;

  if (status === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (status === 'should-be-done') {
    filteredTasks = tasks.filter(task => !task.completed);
  }
  

  filteredTasks.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <input type="checkbox" class="task-checkbox" data-task-id="${task.id}" ${task.completed ? 'checked' : ''}>
      <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
      <img class="notes-icon" src="https://img.icons8.com/?size=512&id=12581&format=png" alt="Notes" data-task-id="${task.id}" width="16" height="16" >
      <img class="delete-task-icon" src="https://cdn4.iconfinder.com/data/icons/rating-validation-3/128/decline_cross_cancel_close_mistake-512.png" alt="Delete" data-task-id="${task.id}" width="55" height="55">
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
    createdAt: new Date(), // Add creation date and time
  };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTasks();
  taskInput.value = '';
}


function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function toggleTaskCompleted(id, completed) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

// Check saved tasks on page load
renderTasks();

addTaskButton.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    addTask();
  }
});

document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.getAttribute('href') === '#savedNotes') {
    // Navigate to the saved_notes.html page
    window.location.href = 'savednotes.html';
  }
  if (target.getAttribute('href') === '#showStatus') {
    // Navigate to the task_statuses.html page
    window.location.href = 'taskstatus.html';
  }
  if (target.classList.contains('delete-task-icon')) {
    const taskId = parseInt(target.getAttribute('data-task-id'));
    deleteTask(taskId);
    if (target.classList.contains('close-notes-popup')) {
      const savedNotesSection = document.getElementById('savedNotes');
      savedNotesSection.style.display = 'none'; // Hide the saved notes section
    }
  
  }
  
  if (target.classList.contains('notes-icon')) {
    const taskId = parseInt(target.getAttribute('data-task-id'));
    const notesPopup = document.getElementById('notesPopup');
    const popupNotesTextarea = document.getElementById('popupNotesTextarea');
    
    // Populate the textarea with the existing notes content
    const task = tasks.find((task) => task.id === taskId);
    popupNotesTextarea.value = task.notes || '';
    
    notesPopup.style.display = 'block';

    // Save notes when the save button is clicked
   
    const savePopupNotesButton = document.getElementById('savePopupNotesButton');
savePopupNotesButton.addEventListener('click', () => {
  task.notes = popupNotesTextarea.value;
  task.notesCreatedAt = new Date(); // Add notes creation date and time
  localStorage.setItem('tasks', JSON.stringify(tasks));
  notesPopup.style.display = 'none';
});


    // Close the pop-up when the close icon is clicked
    const closeNotesPopup = document.getElementById('closeNotesPopup');
    closeNotesPopup.addEventListener('click', () => {
      notesPopup.style.display = 'none';
    });
  }

 
  
  if (target.classList.contains('set-reminder-button')) {
    const taskId = parseInt(target.getAttribute('data-task-id'));
    const taskToSetReminder = tasks.find(task => task.id === taskId);

    const reminderModal = document.getElementById('reminderModal');
    reminderModal.style.display = 'block';

    const setReminderConfirmButton = document.getElementById('setReminderConfirm');
    setReminderConfirmButton.addEventListener('click', () => {
      // ... Your reminder functionality ...
    });
  }

  if (target.classList.contains('task-checkbox')) {
    const taskId = parseInt(target.getAttribute('data-task-id'));
    toggleTaskCompleted(taskId, target.checked);
  }

  if (target.classList.contains('glow-on-hover')) {
    const status = target.getAttribute('data-status');
    renderTasks(status);
  }

  if (target.textContent === 'Clear All Tasks') {
    clearAllTasks();
  }

  if (target.textContent === 'Mark All Completed') {
    markAllCompleted();
  }
 
  
  
  
  
  // ...
});


// Mode toggle button
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});



function markAllCompleted() {
  tasks.forEach(task => task.completed = true);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}
function renderSavedNotes() {
  const savedNotesList = document.getElementById('savedNotesList');
  savedNotesList.innerHTML = '';

  tasks.forEach((task) => {
    if (task.notes) {
      const savedNoteItem = document.createElement('li');
      savedNoteItem.textContent = task.notes;
      savedNotesList.appendChild(savedNoteItem);
      
    }
  });
}
const menuCheckbox = document.querySelector(".checkbox");
const glowButtons = document.querySelectorAll(".glow-on-hover");

menuCheckbox.addEventListener("change", () => {
    glowButtons.forEach(button => {
        if (menuCheckbox.checked) {
            button.classList.add("hidden");
        } else {
            button.classList.remove("hidden");
        }
    });
});




