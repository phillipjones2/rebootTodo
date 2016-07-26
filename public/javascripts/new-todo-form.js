'use strict';

const addTodoAcceptBtn = document.getElementById('accept-button'),
			addTodoInput = getElById('add-todo-input'),
			addTodoTextArea = getElById('add-todo-textarea'),
			addTodoPriorityBtn = getElById('add-todo-priority-button');

addTodoAcceptBtn.addEventListener('click', (e) => {
	const title = addTodoInput.value,
				body = addTodoTextArea.value,
				priority = addTodoPriorityBtn.value;

	const req = new XMLHttpRequest();
	req.open('post', '/', true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send(`title=${title}&body=${body}&priority=${priority}`);

	setTimeout(() => {
		location.reload();
	}, 150);
});
