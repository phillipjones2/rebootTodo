
const addTodoModal = document.getElementById('add-todo-modal'),
			todos = document.getElementsByClassName('todo'),
			todosLen = todos.length;

for (let todo of todos) {
	let	touchStartX,
			touchStartY;

	todo.addEventListener('touchstart', function(e) {
		touchStartX = e.touches[0].screenX;
		touchStartY = e.touches[0].screenY;
	});

	todo.addEventListener('touchend', function(e) {
		var thisTodo = e.target;
		if (!e.target.classList.contains('todo')) {
			var thisParentID = thisTodo.getAttribute('todo-parent');
			console.log(thisParentID);
			thisTodo = document.getElementById(thisParentID);
			console.log(thisTodo);
		}
		console.log(e);
		console.log(thisTodo);
		var touchEndX = e.changedTouches[0].screenX;
		var touchEndY = e.changedTouches[0].screenY;
		var thisTodoWidth = todo.scrollWidth;
		var thisTodoHeight = todo.scrollHeight;
		var touchXDifference = touchStartX - touchEndX;

		if (touchXDifference < 0 ) {
			var rightSwipe = true;
		} else {
			var leftSwipe = true;
		};

		var swipeDist = Math.abs(touchXDifference);
		var swipeWaiver = Math. abs(touchStartY - touchEndY)

		if (swipeWaiver > thisTodoHeight && swipeDist < thisTodoWidth / 2) {
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
var modalCloseButton = document.getElementById('close-button');
var modalAcceptButton = document.getElementById('accept-button');
function hideModal(e) {	addTodoModal.classList.add('hidden') }
function showModal(e) {	addTodoModal.classList.remove('hidden') }
