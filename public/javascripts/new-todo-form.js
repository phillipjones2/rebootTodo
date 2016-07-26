const addTodoModal = getElById('add-todo-modal'),
			modalCloseButton = getElById('close-button'),
			modalAcceptButton = getElById('accept-button'),
			addTodoButton = getElById('add-button');



modalCloseButton.addEventListener('click', (e) => {
	addTodoModal.classList.add('hidden');
	addTodoButton.classList.remove('hidden');
})

function showModal(e) {
	addTodoModal.classList.remove('hidden');
	addTodoButton.classList.add('hidden');
};






// ----- CREATE A TODO ----- \\
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

// ----- CREATE A TODO PRIORITY BUTTON ----- \\
const addTodoPriorityButton = document.getElementById('add-todo-priority-button'),
      addTodoO = document.getElementById('todo-o');

addTodoPriorityButton.addEventListener('click',(e) => {
  rotatePriorities(addTodoPriorityButton, addTodoO, 'text');
});
