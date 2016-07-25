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

