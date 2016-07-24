
var modalCloseButton = document.getElementById('close-button');
var modalAcceptButton = document.getElementById('accept-button');
var addTodoModal = document.getElementById('add-todo-modal');
var todos = document.getElementsByClassName('todo');

var todosLen = todos.length;

for (var i = 0; i < todosLen; i++) {
	var todo = todos[i];
	var touchStart;
	todo.addEventListener('touchstart', function(e) {
		touchStart = e.touches[0].screenX;
	});
	todo.addEventListener('touchend', function(e) {
		var touchEnd = e.changedTouches[0].screenX;
		var thisTodoWidth = todo.scrollWidth;
		var touchXDifference = touchStart - touchEnd;
		console.log(`thisTodoWidth / 2}`);
		console.log(touchStart);
		console.log(touchEnd);
		if (touchXDifference <= (thisTodoWidth / 2)) {
			console.log(`startx - endx = ${touchStart - touchEnd}`)
			if (touchXDifference > 0) {
				console.log('left');
			} else {
				console.log('right');
			}
		}
	});
}



function hideModal(e) {
	addTodoModal.classList.add('hidden');
}

function showModal(e) {
	addTodoModal.classList.remove('hidden');
}

