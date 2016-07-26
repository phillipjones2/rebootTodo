const addTodoModal = getElById('add-todo-modal'),
			closeCreateTodoModalButton = getElById('close-button'),
			newTodoSubmitButton = getElById('accept-button'),
			openCreateTodoModalButton = getElById('add-button');

closeCreateTodoModalButton.addEventListener('click', (e) => {
	addTodoModal.classList.add('hidden');
	openCreateTodoModalButton.classList.remove('hidden');
})

openCreateTodoModalButton.addEventListener('click', (e) => {
		addTodoModal.classList.remove('hidden');
		openCreateTodoModalButton.classList.add('hidden');
});

// ----- CREATE A TODO ----- \\
const addTodoAcceptBtn = document.getElementById('accept-button'),
			addTodoInput = getElById('add-todo-input'),
			addTodoTextArea = getElById('add-todo-textarea'),
			addTodoPriorityBtn = getElById('add-todo-priority-button');

addTodoInput.addEventListener('keyup', (e) => {
	if (addTodoInput.value.trim() == '') {
		newTodoSubmitButton.classList.add('inactive-todo-submit-button');
	}
	else {
		newTodoSubmitButton.classList.remove('inactive-todo-submit-button');
	}
});

addTodoAcceptBtn.addEventListener('click', (e) => {
	if (newTodoSubmitButton.classList.contains('inactive-todo-submit-button')) return;

	const title = addTodoInput.value,
				body = addTodoTextArea.value,
				priority = addTodoPriorityBtn.value;


	const req = new XMLHttpRequest();
	req.onreadystatechange = ( ) => {
		console.log('lolo');
		location.reload();
	}
	req.open('post', '/', true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send(`title=${title}&body=${body}&priority=${priority}`);
});

// ----- CREATE A TODO PRIORITY BUTTON ----- \\
const addTodoPriorityButton = document.getElementById('add-todo-priority-button'),
      addTodoO = document.getElementById('todo-o');

addTodoPriorityButton.addEventListener('click',(e) => {
  rotatePriorities(addTodoPriorityButton, addTodoO, 'text');
});
