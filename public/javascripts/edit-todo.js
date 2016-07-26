'use strict';

const editTodoButtons = document.getElementsByClassName('todo-save-button');

for (let button of editTodoButtons) {
  let parentID = button.getAttribute('todo-parent'),
      parent = document.getElementById(parentID),
      todoTitle = parent.querySelector('.todo-title').innerText,
      todoBody = parent.querySelector('.todo-body').innerText.trim(),
      priority = parent.querySelector('.todo-edit-priority').value,
      objectID = parent.getAttribute('todo-object-id').slice(1,-1),
      putLink = `/${objectID}`;

  button.addEventListener('click', (e) => {
    let parentID = button.getAttribute('todo-parent'),
        parent = document.getElementById(parentID),
        todoTitle = parent.querySelector('.todo-title').innerText,
        todoBody = parent.querySelector('.todo-body').innerText.trim(),
        priority = parent.querySelector('.todo-edit-priority').value,
        objectID = parent.getAttribute('todo-object-id').slice(1,-1),
        putLink = `/${objectID}`;

  	const req = new XMLHttpRequest();
  	req.open('put', putLink , true);
  	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	req.send(`title=${todoTitle}&body=${todoBody}&priority=${priority}`);

  	// setTimeout(() => {
  	// 	location.reload();
  	// }, 150);
  });
}
