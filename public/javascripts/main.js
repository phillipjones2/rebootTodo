
var modalCloseButton = document.getElementById('close-button');
var modalAcceptButton = document.getElementById('accept-button');
var addTodoModal = document.getElementById('add-todo-modal');
var todos = document.getElementsByClassName('todo');

var todosLen = todos.length;

for (var i = 0; i < todosLen; i++) {
	var todo = todos[i];
	var touchStartX;
	var touchStartY;
	todo.addEventListener('touchstart', function(e) {
		touchStartX = e.touches[0].screenX;
		touchStartY = e.touches[0].screenY;

	});
	todo.addEventListener('touchend', function(e) {
		var touchEndX = e.changedTouches[0].screenX;
		var touchEndY = e.changedTouches[0].screenY;

		var thisTodoWidth = todo.scrollWidth;
		var thisTodoHeight = todo.scrollHeight;
		var touchXDifference = touchStartX - touchEndX;
		// console.log(`touch start: ${touchStartX}`);
		// console.log(`touch end: ${touchEndX}`);
		if (touchXDifference < 0 ) {
		console.log('LEFT TO RIGHT');
		} else {
		console.log('RIGHT TO LEFT');
		};
		var swipeDist = Math.abs(touchXDifference);
		console.log(`swipe distance: ${swipeDist}`);
		var swipeWaiver = Math. abs(touchStartY - touchEndY)
		console.log(`swipe Waiver: ${swipeWaiver}`);
		if (swipeWaiver > thisTodoHeight) {
			console.log("doesn't register")
		}








		// if (touchXDifference <= (thisTodoWidth / 2)) {
		// 	console.log(`startx - endx = ${touchStart - touchEnd}`)
		// 	if (touchXDifference > 0) {
		// 		console.log('left');
		// 	} else {
		// 		console.log('right');
		// 	}
		// }
	});
}



function hideModal(e) {
	addTodoModal.classList.add('hidden');
}

function showModal(e) {
	addTodoModal.classList.remove('hidden');
}
