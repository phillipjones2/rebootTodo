const addTodoModal = getElById('add-todo-modal'),
			titleCharacterCount = document.getElementById('add-todo-title-character-count'),
			bodyCharacterCount = document.getElementById('add-todo-body-character-count'),
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
const addTodoSubmitButton = document.getElementById('accept-button'),
			addTodoTitleInput = getElById('add-todo-input'),
			addTodoBodyInput = getElById('add-todo-textarea'),
			addTodoPriorityBtn = getElById('add-todo-priority-button'),
			maxTitleLength = 55,
			maxBodyLength = 140;




function addTodoValidityCheck() {
	// If title is 0 or greater than 55 or
	// if body is greater than 140 disable
	// the submit button AND

	const titleInputLength = addTodoTitleInput.value.trim().length,
		bodyInputLength = addTodoBodyInput.value.trim().length;

	let valid = true;

	if (titleInputLength == 0 || titleInputLength > maxTitleLength) {
		valid = false;
		newTodoSubmitButton.classList.add('inactive-todo-submit-button');
		titleCharacterCount.classList.add('priority-text-2');
	} else {
		titleCharacterCount.classList.remove('priority-text-2');
	}

	if (bodyInputLength > maxBodyLength) {
		valid = false;
		newTodoSubmitButton.classList.add('inactive-todo-submit-button');
		bodyCharacterCount.classList.add('priority-text-2');
	} else {
		bodyCharacterCount.classList.remove('priority-text-2');
	}

	if (valid) {
		newTodoSubmitButton.classList.remove('inactive-todo-submit-button');
	}
}

addTodoTitleInput.addEventListener('keyup', (e) => {
	titleCharacterCount.innerText = maxTitleLength - addTodoTitleInput.value.trim().length;
	titleCharacterCount.classList.remove('hidden');
	addTodoValidityCheck()
});

addTodoTitleInput.addEventListener('focus', (e) => {
	if (!bodyCharacterCount.classList.contains('priority-text-2')) {
	bodyCharacterCount.classList.add('hidden');
	}
});

// create TODO BODY LISTENER
addTodoBodyInput.addEventListener('keyup', (e) => {
	bodyCharacterCount.innerText = maxBodyLength - addTodoBodyInput.value.trim().length;
	bodyCharacterCount.classList.remove('hidden');
	addTodoValidityCheck();
});

addTodoBodyInput.addEventListener('focus', (e) => {
	if (!titleCharacterCount.classList.contains('priority-text-2')) {
	titleCharacterCount.classList.add('hidden');
	}
});

addTodoSubmitButton.addEventListener('click', (e) => {
	if (newTodoSubmitButton.classList.contains('inactive-todo-submit-button')) return;

	const title = addTodoTitleInput.value,
				body = addTodoBodyInput.value,
				priority = addTodoPriorityBtn.value;

	const req = new XMLHttpRequest();
	req.onreadystatechange = ( ) => {
		location.reload();
	}
	req.open('post', '/todos', true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send(`title=${title}&body=${body}&priority=${priority}`);
});

// ----- CREATE A TODO PRIORITY BUTTON ----- \\
const addTodoPriorityButton = document.getElementById('add-todo-priority-button'),
      addTodoO = document.getElementById('todo-o');

addTodoPriorityButton.addEventListener('click',(e) => {
  rotatePriorities(addTodoPriorityButton, addTodoO, 'text');
});
