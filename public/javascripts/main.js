
const addTodoModal = document.getElementById('add-todo-modal'),
			todos = document.getElementsByClassName('todo'),
			todosLen = todos.length;

for (let todo of todos) {
	todo.style.height = todo.scrollY;

	let	touchStartX, touchStartY;

	// When touch on todo element begins, store the
	// starting X and Y coordinates of the swipe.
	todo.addEventListener('touchstart', (e) => {
		touchStartX = e.touches[0].screenX;
		touchStartY = e.touches[0].screenY;
	}); // touchstart

	// When touch on todo element ends...

	todo.addEventListener('touchend', (e) => {
		// - Get the target element of the touch.
		let thisTodo = e.target;

		// - If it is not the todo itself, but a child instead...
		if (!e.target.classList.contains('todo')) {
			// get the corresponding parent todo div.
			const thisParentID = thisTodo.getAttribute('todo-parent');
			thisTodo = document.getElementById(thisParentID);
		} // if

		const thisParentID = thisTodo.getAttribute('id'),
					touchEndX = e.changedTouches[0].screenX,
					touchEndY = e.changedTouches[0].screenY,
					todoWidth = todo.scrollWidth,
					todoHeight = todo.scrollHeight,
					swipeXDifference = touchStartX - touchEndX;

		// Create absolute values from swipe coordinates.
		const [distance, wavier] = [
			Math.abs(swipeXDifference),
			Math.abs(touchStartY - touchEndY)
		];

		// If the touch event is an obvious tap, expand the
		// todo to show all content and close other open todos.
		if (distance < 10 && wavier < 10) {
			const todoChildren = document.querySelectorAll(`[todo-parent=${thisParentID}]`);

			const otherTodoChildren = document.querySelectorAll(`:not([todo-parent=${thisParentID}]`)
			for (let otherTodoChild of otherTodoChildren) {
				otherTodoChild.classList.remove('shown-todo-child');
			}

			for (let todoChild of todoChildren) {
				todoChild.classList.add('shown-todo-child');
			}

		}

		const validSwipe = (wavier < todoHeight &&
											  distance > todoWidth / 2);

		// Determine direction of swipe and set booleans
		// for use in future conditionals.
		const rightSwipe = swipeXDifference < 0 ? true : false;

		// If the swipe does not meet state change criteria, exit.
		// Otherwise, check if the swipe was leftward or rightward.
		if (!validSwipe) return;
		else {
			if (rightSwipe) {

				// If the todo is already marked for deletion and
				// receives another right swipe, un-schedule deletion
				// and return todo to original state.
				if (thisTodo.classList.contains('bg-red') && thisTodo.style.opacity == '0.4') {
					thisTodo.classList.remove('bg-red');
					thisTodo.style.opacity = '1';
				}

				// If the todo has already received an initial right
				// swipe for deletion, schedule it for deletion.
				else if (thisTodo.classList.contains('bg-red')) {
					console.log('......')
					thisTodo.style.opacity = '0.4'; // TEMPORARY
				} else {
					// If the todo is receiving its first deletion swipe,
					// give it .bg-red and make sure .bg-green is not present.
					thisTodo.classList.add('bg-red');
					thisTodo.classList.remove('bg-green');
				} // else
			} else { // If left swipe...
				// If the todo is already marked as complete,
				// remove the completed state.
				if (thisTodo.classList.contains('bg-green')) {
					thisTodo.classList.remove('bg-green');
				} else {
					thisTodo.style.opacity = '1';
					thisTodo.classList.add('bg-green');
					thisTodo.classList.remove('bg-red');
				}
			} // else
		} // else
	}); // touchend
} // for







// When the + button is clicked, open the new todo modal.
// When the x button in the modal are clicked, close it.
const modalCloseButton = document.getElementById('close-button'),
			modalAcceptButton = document.getElementById('accept-button');

function hideModal(e) {	addTodoModal.classList.add('hidden') }
function showModal(e) {	addTodoModal.classList.remove('hidden') }
