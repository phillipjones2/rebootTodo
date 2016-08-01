
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

function removeClasses(el, classesArray) {
	classesArray.forEach((_class, i) => {
		el.classList.remove(_class)
	});
};

// NO LONGER NEEDED - - convert the id's to strings in the route
// function trimQuotes(string) {
// 	return string.slice(1, -1);
// };

function getParentTodo(el) {
	const parentID = el.getAttribute('todo-parent'),
				parent = getElById(parentID);
	return parent;
};

function getTodoTree(el) {
	const todoID = el.getAttribute('todo-parent'),
				parent = document.getElementById(todoID),
				children = parent.querySelector('[todo-parent]'),
				priorityButton = parent.querySelector('.todo-edit-priority'),
				priority = priorityButton.value,
				priorityText = `${priorityButton.innerText}`,
				priorityClass = `${priorityButton.classList}`,
				title = parent.querySelector('h3'),
				titleText = title.innerText.trim(),
				body = parent.querySelector('.todo-body'),
				bodyText = body.innerText.trim(),
				originalText = `${titleText} ${bodyText} ${priority}`,
				saveButton = parent.querySelector('.todo-save-button'),
				discardButton = parent.querySelector('.todo-discard-button'),
				completeButton = parent.querySelector('.todo-complete-button'),
				date = parent.querySelector('.todo-date'),
				closeButtonBox = parent.querySelector('.close-todo-button-box'),
				closeButton = parent.querySelector('.close-todo-button'),
				putLink = '/' + todoID,
				keystrokes = 0;
				// parentClass = `${parent.classList}`;

	return {
		parent,
		// parentClass,
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
		closeButtonBox,
		closeButton,
		date,
		putLink,
		keystrokes,
	};
}

//----- COMPARE DIFFS FOR DISCARD/SAVE BUTTON FUNCTIONALITY -----\\
function compareNewAndOriginalText(val, newText) {
	const originalText = val.parent.tree.originalText;
	if (newText != originalText) {
		val.parent.tree.saveButton.classList.remove('inactive-todo-button');
		val.parent.tree.discardButton.classList.remove('inactive-todo-button');
	} else {
		val.parent.tree.saveButton.classList.add('inactive-todo-button');
		val.parent.tree.discardButton.classList.add('inactive-todo-button');
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
		const todoID = target.getAttribute('todo-parent'),
					parent = docuement.getElementById(todoID);
		return parent;
	} else { return target };
};
