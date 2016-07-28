const addTodoModal = getElById('add-todo-modal'),
			titleCharP = document.getElementById('titleCharP'),
			bodyCharP = document.getElementById('bodyCharP'),
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
			addTodoPriorityBtn = getElById('add-todo-priority-button'),
			maxTitleLength = 55,
			maxBodyLength = 140,
			createModalTitleCount = document.querySelector('#add-todo-title-character-count-box'),
			createModalBodyCount = document.querySelector('#add-todo-body-character-count-box');

// create TODO TITLE LISTENER
addTodoInput.addEventListener('keyup', (e) => {
	// IF NO CHARACTERS
	if (addTodoInput.value.trim() == '') {
		newTodoSubmitButton.classList.add('inactive-todo-submit-button');
		titleCharP.classList.add('hidden');
	}
	else {
		newTodoSubmitButton.classList.remove('inactive-todo-submit-button');
		titleCharP.classList.remove('hidden');
		titleCharP.classList.remove('priority-text-2');
		titleCharP.innerText = maxTitleLength - addTodoInput.value.length;
		// IF TITLE CHARACTERS GO OVER 55 (MAX LENGTH)
		if (addTodoInput.value.length > maxTitleLength) {
			newTodoSubmitButton.classList.add('inactive-todo-submit-button');
			titleCharP.classList.add('priority-text-2');
		}
	}
});
	// create TODO BODY LISTENER
	addTodoTextArea.addEventListener('keyup', (e) => {
		// IF NO CHARACTERS
		if (addTodoTextArea.value == 0) {
			bodyCharP.classList.add('hidden');
		}
		else {
			bodyCharP.classList.remove('hidden');
			bodyCharP.classList.remove('priority-text-2');
			bodyCharP.innerText = maxBodyLength - addTodoTextArea.value.length;
			if (addTodoTextArea.value.length < maxBodyLength
					&& addTodoInput.value.trim() != '') {
				newTodoSubmitButton.classList.remove('inactive-todo-submit-button');
					}
			// IF TITLE CHARACTERS GO OVER 55 (MAX LENGTH)
			if (addTodoTextArea.value.length > maxBodyLength) {
				newTodoSubmitButton.classList.add('inactive-todo-submit-button');
				bodyCharP.classList.add('priority-text-2');
			}
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
