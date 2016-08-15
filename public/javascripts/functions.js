
function getElById(id, parent) {
	if (parent) { return parent.getElementById(id); }
	else { return document.getElementById(id); }
}

function getElsByClass(className, parent) {
	if (parent) { return parent.getElementsByClassName(className); }
	else { return document.getElementsByClassName(className); }
}

function getElByQuery(query, parent) {
	if (parent) { return parent.querySelector(query); }
	else { return document.querySelector(query); }
}

// function getElsByQuery(query, parent) {
// 	if (parent) { return parent.querySelectorAll(query) }
// 	else { return document.querySelectorAll(query) }
// };

function getElsByTag(tag, parent) {
	if (parent) { return parent.getElementsByTagName(tag); }
	else { return document.getElementsByTagName(tag); }
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

// NO LONGER NEEDED - - convert the id's to strings in the route
// function trimQuotes(string) {
// 	return string.slice(1, -1);
// };

function getParentTodo(element) {
	const parentID = element.getAttribute('data-todo-parent'),
				parent = document.getElementById(parentID);
	return parent;
}

function getTodoTree(el) {
	const todoID = el.getAttribute('data-todo-parent'),
				parent = document.getElementById(todoID),
				children = parent.querySelectorAll('[data-todo-parent]'),
				priorityButton = parent.querySelector('.todo-edit-priority'),
				priorityValue = priorityButton.value,
				priorityText = `${priorityButton.innerText}`,
				priorityClass = `${priorityButton.classList}`,
				title = parent.querySelector('h3'),
				titleText = title.innerText.trim(),
				titleCount = parent.querySelector('.todo-title-character-count'),
				titleCountValue = titleCount.value,
				body = parent.querySelector('.todo-body'),
				bodyText = body.innerText.trim(),
				bodyCount = parent.querySelector('.todo-body-character-count'),
				originalText = `${titleText} ${bodyText} ${priorityValue}`,
				saveButton = parent.querySelector('.todo-save-button'),
				discardButton = parent.querySelector('.todo-discard-button'),
				completeButton = parent.querySelector('.todo-complete-button'),
				date = parent.querySelector('.todo-date'),
				closeButtonBox = parent.querySelector('.close-todo-button-box'),
				closeButton = parent.querySelector('.close-todo-button'),
				putLink = 'api/todos/' + todoID,
				keystrokes = 0,
				parentClass = `${parent.classList}`;

	return {
		parent,
		parentClass,
		children,
		priorityButton,
		priorityValue,
		priorityText,
		priorityClass,
		title,
		titleText,
		titleCount,
		body,
		bodyText,
		bodyCount,
		originalText,
		saveButton,
		discardButton,
		completeButton,
		closeButtonBox,
		closeButton,
		date,
		putLink,
		keystrokes,
	};
}

//----- COMPARE DIFFS FOR DISCARD/SAVE BUTTON FUNCTIONALITY -----\\
function compareNewAndOriginalText(todo, newText) {
	const originalText = todo.tree.originalText,
		titleLen = todo.tree.title.innerText.trim().length,
		maxTitleLength = 55,
		bodyLen = todo.tree.body.innerText.length,
		maxBodyLength = 140;
	// If everything is valid and there have been changes,
	// make the save button active.
	if (newText != originalText &&
			titleLen != 0 && titleLen <= maxTitleLength &&
			bodyLen <= maxBodyLength) {
		todo.tree.saveButton.classList.remove('inactive-todo-button');
		todo.tree.titleCount.classList.remove('priority-text-2');
		todo.tree.bodyCount.classList.remove('priority-text-2');
	}

	// If there have been changes, make the discard button active.
	if (newText != originalText) {

		todo.tree.discardButton.classList.remove('inactive-todo-button');

		// and if the title is invalid, make the title count red
		// and inactivate the save button.
		if (titleLen == 0 || titleLen > maxTitleLength) {
			todo.tree.titleCount.classList.add('priority-text-2');
			todo.tree.saveButton.classList.add('inactive-todo-button');
		} else {
			todo.tree.titleCount.classList.remove('priority-text-2');
		}
		// and if the body is invalid, make the body count red
		// and inactivate the save button.
		if (bodyLen > maxBodyLength) {
			todo.tree.bodyCount.classList.add('priority-text-2');
			todo.tree.saveButton.classList.add('inactive-todo-button');
		}
		else {
			todo.tree.bodyCount.classList.remove('priority-text-2');
		}
	}

	if (newText == originalText) {
		todo.tree.discardButton.classList.add('inactive-todo-button');
		todo.tree.saveButton.classList.add('inactive-todo-button');
	}

}

//----- ROTATE CLASSES AND VALUES OF SPECIFIED ELEMENTS -----\\
//| Supply the function with the element being clicked on,
//| the array of values to be applied, and the array of
//| classes to be applied, as well as an optional boolean
//| to determine something that I don't remember now.
function rotatePriorities(el, el2, classArr2, textArr) {
	const classArr = [
      'priority-bg-0',
      'priority-bg-1',
      'priority-bg-2',
    ];

	if (classArr2 == 'border') {
		classArr2 = [
			'priority-0',
			'priority-1',
			'priority-2'
			];
	} else if (classArr2 == 'text') {
		classArr2 = [
			'priority-text-0',
			'priority-text-1',
			'priority-text-2'
		];
	}

	if (el.value == '0') {
		el.value++; //| Make value = 1;
		addClasses(el, [classArr[1]]);
		removeClasses(el, [classArr[0], classArr[2]]);
		if (el2 && classArr2) {
			removeClasses(el2, [classArr2[0], classArr2[2]]);
			addClasses(el2, [classArr2[1]]);
		}
		el.innerText = 'PRIORITY: MEDIUM' || textArr[1];
	}

	else if (el.value == '1') {
		el.value++; //| Make value = 2;
		removeClasses(el, [classArr[0], classArr[1]]);
		addClasses(el, [classArr[2]]);
		if (el2 && classArr2) {
			removeClasses(el2, [classArr2[0], classArr2[1]]);
			addClasses(el2, [classArr2[2]]);
		}
		el.innerText = 'PRIORITY: HIGH' || textArr[2];
	}

	else if (el.value == '2') {
		el.value = 0; //| Make value = 0;
		removeClasses(el, [classArr[1], classArr[2]]);
		addClasses(el, [classArr[0]]);
		if (el2 && classArr2) {
			removeClasses(el2, [classArr2[1], classArr2[2]]);
			addClasses(el2, [classArr2[0]]);
		}
		el.innerText = 'PRIORITY: LOW' || textArr[0];
	}
}


//----- MAKE PARENT TODO THE TARGET OF TAP OR SWIPE -----\\
//| Did the touch event happen on a todo-box or one of its children?
//| If it was a child, get the todo-box parent.
function validateTargetAsTodo(e) {
	const target = e.target;
	if (!target.classList.contains('todo-box')) {
		const todoID = target.getAttribute('data-todo-parent'),
					parent = document.getElementById(todoID);
		return parent;
	} else { return target; }
}


// { method: string,
// 	url: string,
// 	async: bool,
//	send: string,
// 	onSuccessResponse: function }
function newAjaxRequest(obj) {
	const request = new XMLHttpRequest();
	request.onreadystatechange = ( ) => {
		if (request.readyState == 4 && request.status == 200) {
			obj.onSuccessResponse(request);
		}
	};
	request.open(obj.method, obj.url, obj.async);
	if (obj.send) {
		request.send(obj.send);
	} else {
		request.send();
	}
}
