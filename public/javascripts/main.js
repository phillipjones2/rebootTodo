
const	todos = document.getElementsByClassName('todo'),
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
		let thisTodo = e.target;

		if (!e.target.classList.contains('todo')) {
			const thisParentID = thisTodo.getAttribute('todo-parent');
			thisTodo = document.getElementById(thisParentID);
		} // if

		const thisParentID = thisTodo.getAttribute('id'),
					touchEndX = e.changedTouches[0].screenX,
					touchEndY = e.changedTouches[0].screenY,
					todoWidth = todo.scrollWidth,
					todoHeight = todo.scrollHeight,
					swipeXDifference = touchStartX - touchEndX;

		const [distance, wavier] = [
			Math.abs(swipeXDifference),
			Math.abs(touchStartY - touchEndY)
		];

		if (distance < 10 && wavier < 10) { // If the user taps a todo...
			const otherTodoChildren = document.querySelectorAll(`:not([todo-parent=${thisParentID}]`);
			for (let otherTodoChild of otherTodoChildren) {
				otherTodoChild.classList.remove('shown-todo-child');
			}

			const todoChildren = document.querySelectorAll(`[todo-parent=${thisParentID}]`);
			for (let todoChild of todoChildren) {
				todoChild.classList.add('shown-todo-child');
			}
		}

		const validSwipe = (wavier < todoHeight &&
											  distance > todoWidth / 2);

		const rightSwipe = swipeXDifference < 0 ? true : false;

		if (!validSwipe) return;
		else {
			const thisTodoTitle = document.querySelector(`h3[todo-parent=${thisParentID}`);
			if (rightSwipe) {
				if (thisTodo.classList.contains('bg-pale-red') && thisTodo.style.opacity == '0.4') {
					thisTodo.classList.remove('bg-pale-red');
					thisTodo.style.opacity = '1';
					thisTodoTitle.classList.remove('font-white');

				}	else if (thisTodo.classList.contains('bg-pale-red')) {
					thisTodo.style.opacity = '0.4'; // TEMPORARY

				} else {
					thisTodo.classList.add('bg-pale-red');
					thisTodo.classList.remove('bg-pale-green');
					thisTodoTitle.classList.add('font-white');
				} // else

			} else { // If left swipe...
				if (thisTodo.classList.contains('bg-pale-green')) {
					thisTodo.classList.remove('bg-pale-green');
					thisTodoTitle.classList.remove('font-white');

				} else {
					thisTodo.style.opacity = '1';
					thisTodo.classList.add('bg-pale-green');
					thisTodo.classList.remove('bg-pale-red');
					thisTodoTitle.classList.add('font-white');
				}
			} // else
		} // else
	}); // touchend
} // for

const todoTitles = document.getElementsByClassName('todo-title');
for (let title of todoTitles) {
	title.addEventListener('keypress', (e) => {
		console.log(e);
		const thisTitleParentID = title.getAttribute('todo-parent');
		console.log(thisTitleParentID)
		const saveButton = document.querySelector(`.inactive-todo-button[todo-parent=${thisTitleParentID}]`)
		console.log(saveButton)
		saveButton.classList.remove('inactive-todo-button');
	})
}

// When the + button is clicked, open the new todo modal.
// When the x button in the modal are clicked, close it.
// Swap plus icons for variable open and submit functionalities.
const addTodoModal = document.getElementById('add-todo-modal'),
			modalCloseButton = document.getElementById('close-button'),
			modalAcceptButton = document.getElementById('accept-button'),
			addTodoButton = document.getElementById('add-button');

function hideModal(e) {
	addTodoModal.classList.add('hidden');
	addTodoButton.classList.remove('hidden');

}
function showModal(e) {
	addTodoModal.classList.remove('hidden');
	addTodoButton.classList.add('hidden');
}
