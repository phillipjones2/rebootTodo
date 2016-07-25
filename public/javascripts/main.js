
const	todos = getElsByClass('todo-box'),
			todosLen = todos.length;

for (let todo of todos) {
	todo.style.height = todo.scrollY;
	let	touchStartX, touchStartY;

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

		const openTodoHeight = getOpenTodoHeight(thisTodo, thisParentID);
		handleTodoTap(distance, wavier, todo, thisParentID, openTodoHeight);

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
//| When a todo title or todo body is focused and is provided keyboard input.
const todoTitles = getElsByClass('todo-title'),
			todoBodies = getElsByClass('todo-body');

for (let title of todoTitles) {
	const thisTodoParentID = title.getAttribute('todo-parent');	
	const saveButton = getElByQuery(`.inactive-todo-button[todo-parent=${thisTodoParentID}]`);
	title.addEventListener('keypress', handleTodoKeystrokes(title, saveButton[0]));
}

for (let body of todoBodies) {
	const thisTodoParentID = body.getAttribute('todo-parent');
	const saveButton = getElByQuery(`.inactive-todo-button[todo-parent=${thisTodoParentID}]`);
	body.addEventListener('keypress', handleTodoKeystrokes(body, saveButton[0]));
}

function handleTodoKeystrokes(el, button) {
	button.classList.remove('inactive-todo-button');
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
function handleTodoTap(distance, wavier, todo, todoParentID, openTodoHeight) {
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
//|
//|
function getOpenTodoHeight(todo, parentID) {
	const thisTodoContent = getElByQuery(`.todo-content[todo-parent=${parentID}`),
				thisTodoContentHeight = thisTodoContent.clientHeight,
				thisTodoClosedHeight = todo.clientHeight,
				thisTodoOpenHeight = thisTodoContentHeight + thisTodoClosedHeight;

	return thisTodoOpenHeight;
	// console.log(thisTodoContentHeight)
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

function getElById(id) {
	return document.getElementById(id);
};

function getElsByClass(className) {
	return document.getElementsByClassName(className);
};

function getElByQuery(query) {
	return document.querySelector(query);
};

function getElsByQuery(query) {
	return document.querySelectorAll(query);
};

function getElsByTag(tag) {
	return document.getElementsByTagName(tag);
};
