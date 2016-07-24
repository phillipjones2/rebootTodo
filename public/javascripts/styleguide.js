

var modalCloseButton = document.getElementById('close-button');
var modalAcceptButton = document.getElementById('accept-button');
var addTodoModal = document.getElementById('add-todo-modal');

function hideModal(e) {
	addTodoModal.classList.add('hidden');
}