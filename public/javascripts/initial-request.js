
const spinner = document.querySelector('.spinner-container'),
	todoContainer = document.getElementById('todo-container');

const req = newAjaxRequest({
	method: 'get',
	url: '/api/todos',
	async: true,
	// send: 'name=tom&age=23',
	onSuccessResponse: (req) => {
		todoContainer.removeChild(spinner);
		const todos = JSON.parse(req.response);
		if (todos.length < 1) {
			todoContainer.innerHTML += `
				<div class="no-todos-warning box x-center y-center">\
					<h1>No todos to show.</h1>\
				</div>
			`;
			return;
		}
		for (var i = 0, todosLen = todos.length; i < todosLen; i++) {
			const todo = todos[i];

			insertTodoIntoDOM(todo);
		}

		mobileEvents();
		applyEditTodoFunctionality();
	}
});

function insertTodoIntoDOM(todo) {
	const todoClasses = 'todo-box xs-11 sm-11 md-5 lg-3-5 xl-2-5 priority-' + todo.priority,
		todoParent = `data-todo-parent="${todo._id}"`,
		editable = !todo.completed,
		disabled = (todo.completed) ? 'disabled' : '',
		completed = (todo.completed) ? 'data-completed' : '',
		todoPriorities = ['PRIORITY: LOW','PRIORITY: MEDIUM', 'PRIORITY: HIGH'];

	todoContainer.innerHTML += `
		<div class="${todoClasses}" id="${todo._id}" ${completed}\
				 ${todoParent} data-todo-object-id="${todo._id}">\

			<div class="close-todo-button-box" ${todoParent}>\
				<img src="icons/cancel.svg" ${todoParent} class="close-todo-button hidden"/>\
			</div>\

			<h3 ${todoParent} contenteditable="${editable}" spellcheck="false" class="todo-title">\
				${todo.title}\
			</h3>\

			<div class="todo-title-character-count-box box all-12 justify-content-end">\
				<input class="todo-title-character-count hidden" value=0 ${disabled} ${todoParent}/>\
			</div>\

			<div class="todo-content box-col hidden-todo-child" ${todoParent}>\
				<p ${todoParent} contenteditable="${editable}" spellcheck="false" class="todo-body">\
					${todo.body}\
				</p>\

				<div class="todo-body-character-count-box box all-12 justify-content-end">\
					<input class="todo-body-character-count hidden" value=0 ${disabled} ${todoParent}/>
				</div>

				<div class="todo-edit-priority-box box all-12" ${todoParent}>\
					<button class="todo-edit-priority box xs-10 todo-priority-button priority-bg-${todo.priority}",\
									${todoParent} value=${todo.priority} ${disabled}>\
						${todoPriorities[todo.priority]}\
					</button>\
				</div>\

				<div class="todo-button-box box wrap" ${todoParent}>\
					<button class="btn-1 todo-save-button inactive-todo-button" ${todoParent}>\
						SAVE\
					</button>\
					<button class="btn-1 todo-complete-button xs-0 sm-0" ${todoParent}>\
						COMPLETE\
					</button>\
					<button class="btn-1 todo-discard-button inactive-todo-button" ${todoParent}>\
						DISCARD\
					</button>\
					<img src="icons/garbage.svg" class="todo-delete-button xs-0 sm-0"/>
				</div>\

				<small ${todoParent} class="todo-date">\
					<em ${todoParent}>${todo.formattedCreate}</em>\
				</small>\
			</div>\
		</div>
	`;
}
