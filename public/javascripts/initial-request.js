
const spinner = document.querySelector('.spinner-container'),
	todoContainer = document.querySelector('.todo-container');

const req = new XMLHttpRequest();
req.onreadystatechange = ( ) => {
  if (req.readyState == 4 && req.status == 200) {
    handleTodoRetrieval();
  }
};

req.open('get', '/todos', true);
req.send();

function handleTodoRetrieval() {
	todoContainer.removeChild(spinner);
	console.log(req);
}



