'use strict';

const	todos = getElsByClass('todo-box'),
			todosLen = todos.length;

for (let todo of todos) {
	todo.style.height = todo.scrollY;
	let	touchStartX, touchStartY;

	todo.tree = getTodoTree(todo);

	todo.addEventListener('touchstart', (e) => {
		if (document.body.clientWidth >= 520) { return }
		touchStartX = e.touches[0].screenX;
		touchStartY = e.touches[0].screenY;
	}); // touchstart

	todo.addEventListener('touchend', (e) => {
		if (document.body.clientWidth >= 520) { return }

		const thisTodo = validateTargetAsTodo(e),
					thisParentID = thisTodo.getAttribute('id'),
					touchEndX = e.changedTouches[0].screenX,
					touchEndY = e.changedTouches[0].screenY,
					todoWidth = todo.scrollWidth,
					todoHeight = todo.scrollHeight,
					swipeXDifference = touchStartX - touchEndX,
					distance = Math.abs(swipeXDifference),
					wavier = Math.abs(touchStartY - touchEndY),
					rightSwipe = (swipeXDifference < 0 ? true : false),
					validSwipe = (wavier < todoHeight && distance > todoWidth / 2);

		// const openTodoHeight = getOpenTodoHeight(thisTodo, thisParentID);
		handleTodoTap(distance, wavier, todo, thisParentID);

		if (!validSwipe) { return }

		else {
			const thisTodoTitle = getElByQuery(`h3[todo-parent=${thisParentID}`);

			if (rightSwipe) {
				if (thisTodo.classList.contains('deleted-todo')) {
					thisTodo.classList.remove('deleted-todo');
					thisTodo.classList.remove('completed-todo');
					thisTodoTitle.classList.remove('font-white');

				} else {
					thisTodo.classList.add('deleted-todo');
					thisTodo.classList.remove('completed-todo');
					thisTodoTitle.classList.add('font-white');
				} // else

			} else { // If left swipe...
				if (thisTodo.classList.contains('completed-todo')) {
					thisTodo.classList.remove('completed-todo');
					thisTodo.classList.remove('deleted-todo');
					thisTodoTitle.classList.remove('font-white');

				} else {
					thisTodo.classList.add('completed-todo');
					thisTodoTitle.classList.add('font-white');
				}
			} // else
		} // else
	}); // touchend
} // for



//|------------------------------------
//|------------------------------------
//|------------------------------------



//|------------------------------------
//|------------------------------------
//|------------------------------------

const titles = getElsByClass('todo-title');

for (let title of titles) {	
	title.parent = getParentTodo(title);
	

	title.addEventListener('keyup', (e) => {
		const newText = `${title.innerText} ${title.parent.tree.body.innerText}`,
					originalText = title.parent.tree.originalText;

		if (newText != originalText) {
			title.parent.tree.saveButton.classList.remove('inactive-todo-button');
			title.parent.tree.discardButton.classList.remove('inactive-todo-button');
			// console.log(title.todoTree.titleText, title.innerText);
		} else {
			title.parent.tree.saveButton.classList.add('inactive-todo-button');
			title.parent.tree.discardButton.classList.add('inactive-todo-button');
			// console.log(title.todoTree.titleText, title.innerText);
		}
		// console.log(body.todoTree.titleText, body.innerText);
	});
}



//|------------------------------------
//|------------------------------------
//|------------------------------------

const bodies = getElsByClass('todo-body');

for (let body of bodies) {
	body.parent = getParentTodo(body);
	
	body.addEventListener('keyup', (e) => {
		const newText = `${body.parent.tree.title.innerText} ${body.parent.tree.body.innerText}`,
					originalText = body.parent.tree.originalText;

		if (newText != originalText) {
			body.parent.tree.saveButton.classList.remove('inactive-todo-button');
			body.parent.tree.discardButton.classList.remove('inactive-todo-button');
			// console.log(body.todoTree.bodyText, body.innerText);
		} else {
			body.parent.tree.saveButton.classList.add('inactive-todo-button');
			body.parent.tree.discardButton.classList.add('inactive-todo-button');
			// console.log(body.todoTree.bodyText, body.innerText);
		}
		// console.log(body.todoTree.bodyText, body.innerText);
	});
};


//|------------------------------------
//|------------------------------------
//|------------------------------------
const discardButtons = getElsByClass('todo-discard-button');
for (let button of discardButtons) {
	button.addEventListener('click', (e) => {
		button.todoTree = getTodoTree(button);
		if (button.classList.contains('inactive-todo-button')) {
			return;
		} else {
			button.todoTree.title.innerText = button.todoTree.titleText;
			button.todoTree.body.innerText = button.todoTree.bodyText;

		}
	});
}


//|------------------------------------
//|------------------------------------
//|------------------------------------
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



//|------------------------------------
//|------------------------------------
//|------------------------------------
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
};



//|------------------------------------
//|------------------------------------
//|------------------------------------
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
};

function showModal(e) {
	addTodoModal.classList.remove('hidden');
	addTodoButton.classList.add('hidden');
};

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
};

function getElsByClass(className, parent) {
	if (parent) { return parent.getElementsByClassName(className) }
	else { return document.getElementsByClassName(className) }
};

function getElByQuery(query, parent) {
	if (parent) { return parent.querySelector(query) }
	else { return document.querySelector(query) }
};

function getElsByQuery(query, parent) {
	if (parent) { return parent.querySelectorAll(query) }
	else { return document.querySelectorAll(query) }
};

function getElsByTag(tag, parent) {
	if (parent) { return parent.getElementsByTagName(tag) }
	else { return document.getElementsByTagName(tag) }
};

function addClasses(el, classesArray) {
	classesArray.forEach((_class, i) => {
		el.classList.add(_class);
	});
};

function removeClasses(el, classArray) {
	classesArray.forEach((_class, i) => {
		el.classList.remove(_class)
	});
};

function getParentTodo(el) {
	const parentID = el.getAttribute('todo-parent'),
				parent = getElById(parentID);

	return parent;
}

function getTodoTree(el) {
	const todoID = el.getAttribute('todo-parent'),
				parent = getElById(todoID),
				children = getElsByQuery('[todo-parent]', parent),
				title = getElByQuery('h3', parent),
				titleText = title.innerText.trim(),
				body = getElByQuery('.todo-body', parent),
				bodyText = body.innerText.trim(),
				originalText = `${titleText} ${bodyText}`,
				saveButton = getElByQuery('.todo-save-button', parent),
				discardButton = getElByQuery('.todo-discard-button', parent),
				completeButton = getElByQuery('.todo-complete-button', parent),
				date = getElByQuery('.todo-date', parent),
				closeButton = getElByQuery('.todo-close-button', parent),
				keystrokes = 0;

	return {
		parent,
		children,
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
	}
};