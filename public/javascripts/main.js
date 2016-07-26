//| Did the touch event happen on a todo-box or one of its children?
//| If it was a child, get the todo-box parent.
function validateTargetAsTodo(e) {
	const target = e.target;
	if (!target.classList.contains('todo-box')) {
		const thisParentID = target.getAttribute('todo-parent'),
					todoParent = getElById(thisParentID);
		return todoParent;
	} else { return target };
};

//| If touch event was an apparent tap on a todo, close all other
//| open todos and open the one that was tapped.
function handleTodoTap(distance, wavier, todo, todoParentID) {
	if (distance < 10 && wavier < 10) {
		const otherTodoChildren = getElsByQuery(`:not([todo-parent=${todoParentID}]`),
					otherTodoCloseButtons = getElsByQuery(`img[todo-parent]:not([todo-parent=${todoParentID}])`),
					todoChildren = getElsByQuery(`[todo-parent=${todoParentID}]`),
					todoCloseButton = getElByQuery(`img[todo-parent=${todoParentID}]`);

		for (let otherTodoChild of otherTodoChildren) {
			otherTodoChild.classList.remove('shown-todo-child');
		}

		for (let otherTodoCloseButton of otherTodoCloseButtons) {
			otherTodoCloseButton.classList.add('hidden');
		}

		for (let todoChild of todoChildren) {
			todoChild.classList.add('shown-todo-child');
		}

		todoCloseButton.classList.remove('hidden');
	}
}

// When the + button is clicked, open the new todo modal.
// When the x button in the modal are clicked, close it.
// Swap plus icons for variable open and submit functionalities.
const addTodoModal = getElById('add-todo-modal'),
			modalCloseButton = getElById('close-button'),
			modalAcceptButton = getElById('accept-button'),
			addTodoButton = getElById('add-button');

function hideModal(e) {
	addTodoModal.classList.add('hidden');
	addTodoButton.classList.remove('hidden');
}

function showModal(e) {
	addTodoModal.classList.remove('hidden');
	addTodoButton.classList.add('hidden');
}

function closeTodo(e) {
	const closeButtonClicked = e.target,
				buttonParentID = closeButtonClicked.getAttribute('todo-parent'),
				elsButtonHides = getElsByQuery(`[todo-parent=${buttonParentID}]`);

	closeButtonClicked.classList.add('hidden');
	for (let el of elsButtonHides) {
		el.classList.remove('shown-todo-child');
	}
}

function getElById(id, parent) {
	if (parent) { return parent.getElementById(id) }
	else { return document.getElementById(id) }
}

function getElsByClass(className, parent) {
	if (parent) { return parent.getElementsByClassName(className) }
	else { return document.getElementsByClassName(className) }
}

function getElByQuery(query, parent) {
	if (parent) { return parent.querySelector(query) }
	else { return document.querySelector(query) }
}

function getElsByQuery(query, parent) {
	if (parent) { return parent.querySelectorAll(query) }
	else { return document.querySelectorAll(query) }
}

function getElsByTag(tag, parent) {
	if (parent) { return parent.getElementsByTagName(tag) }
	else { return document.getElementsByTagName(tag) }
}

function addClasses(el, classesArray) {
	classesArray.forEach((_class, i) => {
		el.classList.add(_class);
	});
}

function removeClasses(el, classesArray) {
	classesArray.forEach((_class, i) => {
		el.classList.remove(_class);
	});
}

function getParentTodo(el) {
	const parentID = el.getAttribute('todo-parent'),
				parent = getElById(parentID);

	return parent;
}

function getTodoTree(el) {
	const todoID = el.getAttribute('todo-parent'),
				parent = getElById(todoID),
				parentClass = `${parent.classList}`,
				children = getElsByQuery('[todo-parent]', parent),
				priorityButton = getElByQuery('.todo-edit-priority', parent),
				priority = priorityButton.value,
				priorityText = `${priorityButton.innerText}`,
				priorityClass = `${priorityButton.classList}`,
				title = getElByQuery('h3', parent),
				titleText = title.innerText.trim(),
				body = getElByQuery('.todo-body', parent),
				bodyText = body.innerText.trim(),
				originalText = `${titleText} ${bodyText} ${priority}`,
				saveButton = getElByQuery('.todo-save-button', parent),
				discardButton = getElByQuery('.todo-discard-button', parent),
				completeButton = getElByQuery('.todo-complete-button', parent),
				date = getElByQuery('.todo-date', parent),
				closeButton = getElByQuery('.todo-close-button', parent),
				keystrokes = 0;

	return {
		parent,
		parentClass,
		children,
		priorityButton,
		priority,
		priorityText,
		priorityClass,
		title,
		titleText,
		body,
		bodyText,
		originalText,
		saveButton,
		discardButton,
		completeButton,
		date,
		keystrokes,
	};
}
