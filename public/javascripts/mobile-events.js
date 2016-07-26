
//*******************************//
//--- TODO SWIPE FUNCTIONALITY --//
const	todos = getElsByClass('todo-box');

for (let todo of todos) {
 let touchStartX, touchStartY;

 todo.tree = getTodoTree(todo);
 todo.originalClasses = `${todo.classList}`;

 todo.addEventListener('touchstart', (e) => {
   if (document.body.clientWidth >= 520) { return }
   touchStartX = e.touches[0].screenX;
   touchStartY = e.touches[0].screenY;
 }); // touchstart

 todo.addEventListener('touchend', (e) => {
   if (document.body.clientWidth >= 520) { return }
   const thisTodo = validateTargetAsTodo(e),
         todoTree = thisTodo.tree,
         todoID = todo.tree.todoID,
         touchEndX = e.changedTouches[0].screenX,
         touchEndY = e.changedTouches[0].screenY,
         todoWidth = todo.scrollWidth,
         todoHeight = todo.scrollHeight,
         swipeXDifference = touchStartX - touchEndX,
         distance = Math.abs(swipeXDifference),
         wavier = Math.abs(touchStartY - touchEndY),
         rightSwipe = (swipeXDifference < 0 ? true : false),
         validSwipe = (wavier < todoHeight && distance > todoWidth / 2);

  //| If touch event was an apparent tap on a todo, close all other
  //| open todos and open the one that was tapped.
  if (distance < 10 && wavier < 10) {
    const otherTodoChildren = getElsByQuery(`:not([todo-parent=${todoID}]`),
          otherTodoCloseButtons = getElsByQuery(`img[todo-parent]:not([todo-parent=${todoID}])`);

    for (let otherTodoChild of otherTodoChildren) {
      otherTodoChild.classList.remove('shown-todo-child');
    }

    for (let otherTodoCloseButton of otherTodoCloseButtons) {
      otherTodoCloseButton.classList.add('hidden');
    }

    for (let todoChild of todoTree.children) {
      todoChild.classList.add('shown-todo-child');
    }

    todoTree.closeButton.classList.remove('hidden');
    todoTree.closeButtonBox.classList.remove('hidden');
  }

  todoTree.closeButtonBox.addEventListener('click', (e) => {
    const elsToHide = document.querySelectorAll(`[todo-parent=${todoID}]`);
    todoTree.closeButton.classList.add('hidden');
    todoTree.closeButtonBox.classList.add('hidden');
    for (let el of todoTree.children) {
      el.classList.remove('shown-todo-child');
    }
  })

  if (!validSwipe) { return }

  else { // If right swipe...
    const thisTodoTitle = todo.tree.title,
          todoObjectId = todo.getAttribute('todo-object-id').slice(1,-1);
      let putLink = `/${todoObjectId}`;
      console.log(putLink);
    if (rightSwipe) {
    if (thisTodo.classList.contains('deleted-todo')) {

      const req = new XMLHttpRequest();
    	req.open('delete', putLink , true);
    	// req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    	req.send();

    	setTimeout(() => {
    		location.reload();
    	}, 150);
    };

    thisTodo.classList.add('deleted-todo');
    thisTodo.classList.remove('completed-todo');
    thisTodoTitle.classList.add('font-white');

    // Insert delete confirmation string above title.

    // Create necessary elements and text node.
    // const confirmDeleteMessage = document.createElement('h2'),
    //      confirmDeleteButtonDiv = document.createElement('div'),
    //      confirmDeleteButton = document.createElement('img'),
    //      cancelDeleteButton = document.createElement('img'),
    //      deleteMessage = document.createTextNode('Delete todo?');
    //
    // // Add classes to confirmDeleteButtonDiv.
    // addClasses(confirmDeleteButtonDiv, [
    //   'box', 'all-12', 'space-inside'
    // ]);
    // let todoParentID = todo.getAttribute('id');
    // // Give buttons respective image srcs.
    // confirmDeleteButton.setAttribute('src', 'icons/checked.svg');
    // confirmDeleteButton.setAttribute('todo-parent',todoParentID);
    // addClasses(confirmDeleteButton, [
    //     'confirmation-action-button',
    //     'confirmation-delete'
    //   ]);
    //
    // cancelDeleteButton.setAttribute('src', 'icons/cancel.svg');
    // cancelDeleteButton.setAttribute('todo-parent',todoParentID)
    //     addClasses(cancelDeleteButton, [
    //     'confirmation-action-button',
    //     'confirmation-cancel'
    //   ]);
    //
    // // Place buttons inside of confirmDeleteButtonDiv.
    // confirmDeleteButtonDiv.appendChild(cancelDeleteButton);
    // confirmDeleteButtonDiv.appendChild(confirmDeleteButton);
    // confirmDeleteButtonDiv.classList.add('pt_25');
    //
    // // Add text node to confirmDeleteMessage.
    // confirmDeleteMessage.appendChild(deleteMessage);
    //
    // // Insert confirmDeleteMessage into the todo before the title.
    // todo.insertBefore(confirmDeleteMessage, todo.tree.title);
    //
    // // Insert confirmDeleteButtonDiv at end of the todo.
    // todo.appendChild(confirmDeleteButtonDiv);


    // confirmDeleteButton.addEventListener('click', (e) => {
    //   const todoTree = getParentTodo(confirmDeleteButton);
    //         console.log(todoTree);
      // const req = new XMLHttpRequest();
    	// req.open('delete', putLink , true);
    	// req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    	// req.send(`title=${todoTitle}&body=${todoBody}&priority=${priority}`);

    	// setTimeout(() => {
    	// 	location.reload();
    	// }, 150);
    // });

    // cancelDeleteButton.addEventListener('click', (e) => {
    //
    // });

     } else { // If left swipe...
       if (thisTodo.classList.contains('deleted-todo')) return;
       if (thisTodo.classList.contains('completed-todo')) {
         thisTodo.classList.remove('completed-todo');
         thisTodo.classList.remove('deleted-todo');
         thisTodoTitle.classList.remove('font-white');

       } else {
         thisTodo.classList.add('completed-todo');
         thisTodoTitle.classList.add('font-white');
       }
     } // else
   } // else
 }); // touchend
} // for
