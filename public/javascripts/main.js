
const addTodoModal = document.getElementById('add-todo-modal'),
			todos = document.getElementsByClassName('todo'),
			todosLen = todos.length;

for (let todo of todos) {
	let	touchStartX, touchStartY;

	todo.addEventListener('touchstart', (e) => {
		touchStartX = e.touches[0].screenX;
		touchStartY = e.touches[0].screenY;
	});

	todo.addEventListener('touchend', (e) => {
		let thisTodo = e.target;
		if (!e.target.classList.contains('todo')) {
			const thisParentID = thisTodo.getAttribute('todo-parent');
			thisTodo = document.getElementById(thisParentID);
		}

		const touchEndX = e.changedTouches[0].screenX,
					touchEndY = e.changedTouches[0].screenY,
					todoWidth = todo.scrollWidth,
					todoHeight = todo.scrollHeight,
					touchXDifference = touchStartX - touchEndX;
					
		let rightSwipe = false, leftSwipe = false;

		if (touchXDifference < 0) {
			rightSwipe = true;
		} else {
			leftSwipe = true;
		};

		const [distance, wavier] = [
			Math.abs(touchXDifference),
			Math. abs(touchStartY - touchEndY)
		];

		const validSwipe = (wavier < todoHeight &&
											  distance > todoWidth / 2);

		if (!validSwipe) {
			return;
		} else {
			if (rightSwipe) {
				thisTodo.classList.add('bg-red');
				thisTodo.classList.remove('bg-green');
			} else {
				thisTodo.classList.add('bg-green');
				thisTodo.classList.remove('bg-red');
			}
		}
	});
}

// When the + button is clicked, open the new todo modal.
// When the x button in the modal are clicked, close it.
const modalCloseButton = document.getElementById('close-button'),
			modalAcceptButton = document.getElementById('accept-button');

function hideModal(e) {	addTodoModal.classList.add('hidden') }
function showModal(e) {	addTodoModal.classList.remove('hidden') }
