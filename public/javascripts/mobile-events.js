 const mobileEvents = () => {
  const todos = getElsByClass('todo-box'),
    timestamp = new Date();

  for (var i = 0, todosLen = todos.length; i < todosLen; i++) {
    var touchStartX, touchStartY,
      todo = todos[i];

    todo.tree = getTodoTree(todo);
    // todo.originalClasses = `${todo.classList}`;

    todo.addEventListener('touchstart', (e) => {
      if (document.body.clientWidth >= 766) { return; }
        touchStartX = e.touches[0].screenX;
        touchStartY = e.touches[0].screenY;
     }); // touchstart

    todo.addEventListener('touchend', (e) => {
      if (document.body.clientWidth >= 766) { return; }
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
        // debugger;


    //| If touch event was an apparent tap on a todo, close all other
    //| open todos and open the one that was tapped.
    if (tap) {
      const otherTodoChildren = document
              .querySelectorAll(`:not([data-todo-parent="${todo.tree.todoID}"])`),
            otherTodoCloseButtons = document
              .querySelectorAll(`img[data-todo-parent]:not([todo-parent="${todo.tree.todoID}"])`);

      for (var i = 0, otherLen = otherTodoChildren.length; i < otherLen; i++) {
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
    }
    // EVENT LISTENER TO CLOSE THE EXPANDED TODO
    todo.tree.closeButtonBox.addEventListener('click', (e) => {
      // const elsToHide = document.querySelectorAll(`[todo-parent=${todo.tree.todoID}]`);
      todo.tree.closeButton.classList.add('hidden');
      for (var i = 0, childrenLen = todo.tree.children.length; i < childrenLen; i++) {
        const child = todo.tree.children[i];
        child.classList.remove('shown-todo-child');
      }
    });

//******************************************************//
//--- TODO SWIPE FUNCTIONALITY                         //
//****************************************************//
    if (!validSwipe) { return; }
    else {
      if (rightSwipe) {
        // MARKED FOR DELETION -> DELETE
        if (todo.classList.contains('deleted-todo')) {
          let ajaxObject = {
            method: "delete",
            url: todo.tree.todoPutLink,
            async: true,
            send: "",
            contentType: "",
            headerKey: "Authorization",
            headerValue: `Bearer ${window.sessionStorage.accessToken}`,
            onSuccessResponse: location.reload()
          };
          ajaxCall(ajaxObject);
        // IF CURRENTLY IN A COMPLETED STATE -> UNCOMPLETE
        }
        else if(todo.hasAttribute('data-completed')) {
          let ajaxObject = {
            method: "put",
            url: todo.tree.todoPutLink,
            async: true,
            send: `{\"title\":\"${todo.tree.titleText}\",\"body\":\"${todo.tree.bodyText}\",\"priority\":\"${todo.tree.priorityValue}\",\"completed\":false}`,
            contentType: "application/json",
            headerKey: "Authorization",
            headerValue: `Bearer ${window.sessionStorage.accessToken}`,
            onSuccessResponse: location.reload()
          };
          ajaxCall(ajaxObject);
        } //FROM A NORMAL STATE TO A MARKED FOR DELETION STATE
        else {
          todo.classList.add('deleted-todo');
          todo.classList.remove('completed-todo');
          todo.tree.title.classList.add('font-white');
          todo.tree.title.setAttribute('contenteditable', false);
          todo.tree.body.setAttribute('contenteditable', false);
          todo.tree.priorityButton.setAttribute('disabled', true);
          setTimeout(( ) => {
            if (todo.classList.contains('deleted-todo')){
              todo.classList.remove('deleted-todo');
              todo.tree.title.classList.remove('font-white');
              todo.tree.priorityButton.removeAttribute('disabled');
            }
          }, 2000);
        }
      }
      else { // If left swipe...
        // FROM MARKED FOR DELETION TO NORMAL STATE
        if (todo.classList.contains('deleted-todo')) {
          todo.classList.remove('deleted-todo');
          todo.tree.title.classList.remove('font-white');
          todo.tree.title.setAttribute('contenteditable', true);
          todo.tree.body.setAttribute('contenteditable', true);
          todo.tree.priorityButton.removeAttribute('disabled');
        } // ?? TODO IS COMPLETE AND USER SWIPES LEFT AGAIN ??
        else if (todo.hasAttribute('data-completed')) {return;}
        // From normal state to completed
        else {
          let ajaxObject = {
            method: "put",
            url: todo.tree.todoPutLink,
            async: true,
            send: `title=${todo.tree.titleText}&body=${todo.tree.bodyText}&priority=${todo.tree.priorityValue}&completed=true&completedDate=${timestamp}`,
            contentType: "application/x-www-form-urlencoded",
            headerKey: "Authorization",
            headerValue: `Bearer ${window.sessionStorage.accessToken}`,
            onSuccessResponse: location.reload()
          };
          ajaxCall(ajaxObject);
        }
      } // else
     } // else
   }); // touchend
  } // for
}; // mobileEvents
