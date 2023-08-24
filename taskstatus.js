document.addEventListener('DOMContentLoaded', () => {
  const taskStatusBars = document.getElementById('taskStatusBars');
  
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  tasks.forEach((task) => {
    const taskStatusBar = document.createElement('div');
    taskStatusBar.classList.add('task-status-bar');
    
    const taskStatusLabel = document.createElement('div');
    taskStatusLabel.classList.add("task",'task-status-label');
    taskStatusLabel.textContent = task.text;
    
    const taskStatusFill = document.createElement('div');
    taskStatusFill.classList.add('task-status-fill');
    if (task.completed) {
      taskStatusFill.style.backgroundColor = '#4caf50';
    } else {
      taskStatusFill.style.backgroundColor = '#f44336';
    }
    
    taskStatusBar.appendChild(taskStatusLabel);
    taskStatusBar.appendChild(taskStatusFill);
    
    taskStatusBars.appendChild(taskStatusBar);
  });
});
