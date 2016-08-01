const req = new XMLHttpRequest();
//*******************************//
//--- TODO SWIPE FUNCTIONALITY --//
const	todos = getElsByClass('todo-box');

for (let i = 0, todosLen = todos.length; i < todosLen; i++) {
  let touchStartX, touchStartY,
    todo = todos[i];

  todo.tree = getTodoTree(todo);
  // todo.originalClasses = `${todo.classList}`;

  todo.addEventListener('touchstart', (e) => {
    if (document.body.clientWidth >= 520) { return;}
      touchStartX = e.touches[0].screenX;
      touchStartY = e.touches[0].screenY;
   }); // touchstart

  todo.addEventListener('touchend', (e) => {
    if (document.body.clientWidth >= 520) { return; }
    const todo = validateTargetAsTodo(e),
      touchEndX = e.changedTouches[0].screenX,
      touchEndY = e.changedTouches[0].screenY,
      todoWidth = todo.scrollWidth,
      todoHeight = todo.scrollHeight,
      swipeXDifference = touchStartX - touchEndX,
      distance = Math.abs(swipeXDifference),
      wavier = Math.abs(touchStartY - touchEndY),
      rightSwipe = (swipeXDifference < 0),
      validSwipe = (wavier < todoHeight && distance > todoWidth / 2),
      tap = (distance < 10 && wavier < 10);


  //| If touch event was an apparent tap on a todo, close all other
  //| open todos and open the one that was tapped.
  if (tap) {
    const otherTodoChildren = document
            .querySelectorAll(`:not([todo-parent=${todoID}]`),
          otherTodoCloseButtons = document
            .querySelectorAll(`img[todo-parent]:not([todo-parent=${todoID}])`);
    for (let i = 0, otherLen = otherTodoChildren.length; i < otherLen; i++) {
      const otherTodoChild = otherTodoChildren[i];
      otherTodoChild.classList.remove('shown-todo-child');
    }
    for (let i = 0, otherLen = otherTodoCloseButtons.length; i < otherLen; i++) {
      const otherTodoCloseButton = otherTodoCloseButtons[i];
      otherTodoCloseButton.classList.add('hidden');
    }
    for (let i = 0, childrenLen = todo.tree.children.length; i < childrenLen; i++) {
      const todoChild = todo.tree.children[i];
      todoChild.classList.add('shown-todo-child');
    }
    todo.tree.closeButton.classList.remove('hidden');
    todo.tree.closeButtonBox.classList.remove('hidden');
  }
  // EVENT LISTENER TO CLOSE THE EXPANDED TODO
  todo.tree.closeButtonBox.addEventListener('click', (e) => {
    // const elsToHide = document.querySelectorAll(`[todo-parent=${todoID}]`);
    todo.tree.closeButton.classList.add('hidden');
    todo.tree.closeButtonBox.classList.add('hidden');
    for (let i = 0, childrenLen = todo.tree.children.length; i < childrenLen; i++) {
      const child = todo.tree.children[i];
      child.classList.remove('shown-todo-child');
    }
  });

  if (!validSwipe) { return; }
  else {
    // const thisTodoTitle = todo.tree.title,
    //   todoObjectId = todo.getAttribute('todo-object-id');
    // let parentID = thisTodo.getAttribute('todo-parent'),
    //   parent = document.getElementById(parentID),
    //   todoTitle = parent.querySelector('.todo-title').innerText.trim(),
    //   todoBody = parent.querySelector('.todo-body').innerText.trim(),
    //   priority = parent.querySelector('.todo-edit-priority').value,
    //   timestamp = new Date(),
    //   // putLink = `/${todoObjectId}`,
    //   putLink =  '/' + todoObjectId,
    //   titleElement = parent.querySelector('.todo-title'),
    //   bodyElement = parent.querySelector('.todo-body'),
    //   priorityElement = parent.querySelector('.todo-edit-priority');

    if (rightSwipe) {

      // MARKED FOR DELETION -> DELETE
      if (todo.classList.contains('deleted-todo')) {
        //| When the state of the request changes:
        //| (4): "request finished and response is ready"
        req.onreadystatechange = ( ) => {
          if (req.readyState == 4 && req.status == 200) {
            location.reload();
          }
        };
    	  req.open('delete', todo.tree.putLink , true);
    	  req.send();
      // IF CURRENTLY IN A COMPLETED STATE -> UNCOMPLETE
      }
      else if(todo.hasAttribute('completed')) {
        req.onreadystatechange = ( ) => {
          if (req.readyState == 4 && req.status == 200) {
            location.reload();
          }
        };
        req.open('put', todo.tree.putLink , true);
        req.setRequestHeader("Content-type", "application/json");
        req.send(`{\"title\":\"${todoTitle}\",\"body\":\"${todoBody}\",\"priority\":\"${priority}\",\"completed\":false}`);
      } //FROM A NORMAL STATE TO A MARKED FOR DELETION STATE
      else {
        todo.classList.add('deleted-todo');
        todo.classList.remove('completed-todo');
        todo.tree.title.classList.add('font-white');
        todo.tree.title.setAttribute('contenteditable', false);
        todo.tree.body.setAttribute('contenteditable', false);
        todo.tree.priority.setAttribute('disabled', true);

        setTimeout(( ) => {
          if (todo.classList.contains('deleted-todo')){
            todo.classList.remove('deleted-todo');
            titleElement.classList.remove('font-white');
          }
        }, 2000)
      }
    }
    else { // If left swipe...
      // FROM MARKED FOR DELETION TO NORMAL STATE
      if (todo.classList.contains('deleted-todo')) {
        todo.classList.remove('deleted-todo');
        todo.tree.title.classList.remove('font-white');
        todo.tree.title.setAttribute('contenteditable', true);
        todo.tree.body.setAttribute('contenteditable', true);
        todo.tree.priority.removeAttribute('disabled');
      } // ?? TODO IS COMPLETE AND USER SWIPES LEFT AGAIN ??
      else if (todo.hasAttribute('completed')) {return;}
      else {
         //| When the state of the request changes:
         //| (4): "request finished and response is ready"
        req.onreadystatechange = ( ) => {
          if (req.readyState == 4 && req.status == 200) {
            location.reload();
          }
        };
        req.open('put', todo.tree.putLink , true);
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.send(`title=${todoTitle}&body=${todoBody}&priority=${priority}&completed=true&completedDate=${timestamp}`);
      }
    } // else
   } // else
 }); // touchend
} // for
