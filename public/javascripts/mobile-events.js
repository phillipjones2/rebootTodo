const req = new XMLHttpRequest();
//*******************************//
//--- TODO SWIPE FUNCTIONALITY --//
const	todos = getElsByClass('todo-box');

for (let todo of todos) {
 let touchStartX, touchStartY;

 todo.tree = getTodoTree(todo);
 todo.originalClasses = `${todo.classList}`;

 todo.addEventListener('touchstart', (e) => {
   if (document.body.clientWidth >= 520) { return;}
   touchStartX = e.touches[0].screenX;
   touchStartY = e.touches[0].screenY;
 }); // touchstart

 todo.addEventListener('touchend', (e) => {
   if (document.body.clientWidth >= 520) { return; }
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
  });

  if (!validSwipe) { return }

  else { // If right swipe...
    const thisTodoTitle = todo.tree.title,
          todoObjectId = trimQuotes(todo.getAttribute('todo-object-id'));
      let parentID = thisTodo.getAttribute('todo-parent'),
          parent = document.getElementById(parentID),
          todoTitle = parent.querySelector('.todo-title').innerText.trim(),
          todoBody = parent.querySelector('.todo-body').innerText.trim(),
          priority = parent.querySelector('.todo-edit-priority').value,
          timestamp = new Date(),
          putLink = `/${todoObjectId}`,
          titleElement = parent.querySelector('.todo-title'),
          bodyElement = parent.querySelector('.todo-body'),
          priorityElement = parent.querySelector('.todo-edit-priority');

    console.log(titleElement);
    console.log(bodyElement);
    console.log(priorityElement);

    if (rightSwipe) {
      // MARKED FOR DELETION -> DELETE
      if (thisTodo.classList.contains('deleted-todo')) {
        //| When the state of the request changes:
        //| (4): "request finished and response is ready"
        req.onreadystatechange = ( ) => {
          if (req.readyState == 4 && req.status == 200) {
            location.reload();
          }
        };
    	req.open('delete', putLink , true);
    	req.send();

      // IF CURRENTLY IN A COMPLETED STATE -> UNCOMPLETE
    } else if(parent.hasAttribute('completed')) {
      req.onreadystatechange = ( ) => {
        if (req.readyState == 4 && req.status == 200) {
          location.reload();
        }
      };
     req.open('put', putLink , true);
     req.setRequestHeader("Content-type", "application/json");
     console.log({"title": todoTitle,"body":todoBody,"priority": priority,"completed":false});
    // console.log(`title=${todoTitle}&body=${todoBody}&priority=${priority}&completed=false`);
    // console.log(`{\"title\":\"${todoTitle}\",\"body\":\"${todoBody}\",\"priority\":\"${priority}\",\"completed\":false}`);
     req.send(`{\"title\":\"${todoTitle}\",\"body\":\"${todoBody}\",\"priority\":\"${priority}\",\"completed\":false}`);

   } //FROM A NORMAL STATE TO A MARKED FOR DELETION STATE
    else {
      thisTodo.classList.add('deleted-todo');
      thisTodo.classList.remove('completed-todo');
      thisTodoTitle.classList.add('font-white');
      titleElement.setAttribute('contenteditable', false);
      bodyElement.setAttribute('contenteditable', false);
      priorityElement.setAttribute('disabled', true);


      }
    } else { // If left swipe...
       if (thisTodo.classList.contains('deleted-todo')) {
          thisTodo.classList.remove('deleted-todo');
          thisTodoTitle.classList.remove('font-white');
          titleElement.setAttribute('contenteditable', true);
          bodyElement.setAttribute('contenteditable', true);
          priorityElement.removeAttribute('disabled');

       } // ?? TODO IS COMPLETE AND USER SWIPES LEFT AGAIN ??
       else if (thisTodo.classList.contains('completed-todo')) {
         thisTodo.classList.remove('completed-todo');
         thisTodo.classList.remove('deleted-todo');
         thisTodoTitle.classList.remove('font-white');

       } else {

         //| When the state of the request changes:
         //| (4): "request finished and response is ready"
         req.onreadystatechange = ( ) => {
           if (req.readyState == 4 && req.status == 200) {
             location.reload();
           }
         };
       	req.open('put', putLink , true);
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       	req.send(`title=${todoTitle}&body=${todoBody}&priority=${priority}&completed=true&completedDate=${timestamp}`);

      }
    } // else
   } // else
 }); // touchend
} // for
