document.addEventListener('DOMContentLoaded', () => {
  const savedTasksList = document.getElementById('savedTasksList');
  const savedNotesList = document.getElementById('savedNotesList');
  
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  tasks.forEach((task) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.textContent = `Task: ${task.text}`;
    savedTasksList.appendChild(taskItem);

    if (task.notes) {
      const notesItem = document.createElement('div');
      notesItem.classList.add('notes-item');
      notesItem.textContent = `Notes: ${task.notes}`;
      savedNotesList.appendChild(notesItem);

      const arrowIcon = document.createElement('span');
      arrowIcon.classList.add('arrow-icon');
      arrowIcon.textContent = '▼';
      taskItem.appendChild(arrowIcon);

      let notesVisible = false;

      arrowIcon.addEventListener('click', () => {
        if (notesVisible) {
          notesItem.style.display = 'none';
        } else {
          notesItem.style.display = 'block';
        }
        notesVisible = !notesVisible;
      });
    }
  });
});
