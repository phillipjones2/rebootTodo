
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
          todoObjectId = trimQuotes(todo.getAttribute('todo-object-id'));
      let putLink = `/${todoObjectId}`;
      console.log(putLink);
    if (rightSwipe) {
    if (thisTodo.classList.contains('deleted-todo')) {

      const req = new XMLHttpRequest();

      //| When the state of the request changes:
      //| (4): "request finished and response is ready"
      req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
          console.log('lll')
          location.reload();
        }
      };

    	req.open('delete', putLink , true);
    	req.send();
    };

    thisTodo.classList.add('deleted-todo');
    thisTodo.classList.remove('completed-todo');
    thisTodoTitle.classList.add('font-white');

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
