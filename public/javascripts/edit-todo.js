const applyEditTodoFunctionality = ( ) => {
  const saveEditedTodoButtons = document.getElementsByClassName('todo-save-button'),
    req = new XMLHttpRequest(),
    timestamp = new Date();

  for (var i = 0, saveEditedTodoButtonsLen = saveEditedTodoButtons.length; i < saveEditedTodoButtonsLen; i++) {
    const button = saveEditedTodoButtons[i];

    button.addEventListener('click', (e) => {
      if (button.classList.contains('inactive-todo-button')) { return;}
      const todo = getParentTodo(button),
    	  req = new XMLHttpRequest();
      req.onreadystatechange = ( ) => {
        if (req.readyState == 4 && req.status == 200) {
          location.reload();
        }
      };
    	req.open('put', todo.tree.putLink , true);
    	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    	req.send(`title=${todo.tree.title.innerText}&body=${todo.tree.body.innerText}&priority=${todo.tree.priorityButton.value}`);
    });
  }

   //*****************************************************//
  //--- TITLE DIFF FOR SAVE/DISCARD BUTTON ACTIVATION ---//
  const titles = document.getElementsByClassName('todo-title'),
    maxTitleLength = 55;
  for (var i = 0, titlesLen = titles.length; i < titlesLen; i++) {
    const title = titles[i],
      todo = getParentTodo(title);

    title.addEventListener('keyup', (e) => {
      const newText = `${title.innerText} ${todo.tree.body.innerText} ${todo.tree.priorityButton.value}`;

      compareNewAndOriginalText(todo, newText);
      // VALIDATE CHARACTER LENGTH
      todo.tree.titleCount.classList.remove('hidden');
      todo.tree.titleCount.value = maxTitleLength - title.innerText.length;
    });

    title.addEventListener('focus', (e) => {

      if(!todo.tree.bodyCount.classList.contains('priority-text-2')){
        todo.tree.bodyCount.classList.add('hidden');
      }
    });
  }

   //*****************************************************//
  //---  BODY DIFF FOR SAVE/DISCARD BUTTON ACTIVATION ---//
  const bodies = document.getElementsByClassName('todo-body'),
        maxBodyLength = 140;

  for (var i = 0, bodiesLen = bodies.length; i < bodiesLen; i++) {
   const body = bodies[i],
     todo = getParentTodo(body);

    body.addEventListener('keyup', (e) => {
      const newText = `${todo.tree.title.innerText} ${todo.tree.body.innerText} ${todo.tree.priorityButton.value}`;
      compareNewAndOriginalText(todo, newText);

      // VALIDATE CHARACTER LENGTH
      todo.tree.bodyCount.classList.remove('hidden');
      todo.tree.bodyCount.value = maxBodyLength - body.innerText.length;
    });

    body.addEventListener('focus', (e) => {
      if(!todo.tree.titleCount.classList.contains('priority-text-2')){
        todo.tree.titleCount.classList.add('hidden');
      }
    });
  }

   //********************************************************//
  //--- PRIORITY DIFF FOR SAVE/DISCARD BUTTON ACTIVATION ---//
  const todoEditPriorityButtons = document.getElementsByClassName('todo-edit-priority');
  for (var i = 0, todoEditPriorityButtonsLen = todoEditPriorityButtons.length; i < todoEditPriorityButtonsLen; i++) {
    const button = todoEditPriorityButtons[i];
    button.addEventListener('click', (e) => {
      const todo = getParentTodo(button);
      rotatePriorities(button, todo,'border');
      const newText = `${todo.tree.title.innerText} ${todo.tree.body.innerText} ${todo.tree.priorityButton.value}`;
      compareNewAndOriginalText(todo, newText);
    });
  }

//*************************************************************//
// todo edit buttons fuctionality:  discard, complete, trash
//************************************************************//
  const  editButtonFunction = (button, todo) => {
    button.addEventListener('click', (e) => {
      // complete button
      if (button.classList.contains('todo-complete-button')){
        if (!todo.tree.parent.hasAttribute('data-completed')){
          //| When the state of the request changes:
          //| (4): "request finished and response is ready"
          console.log(button.innerText);
          button.innerText = 'UNCOMPLETE';
          console.log(button.innerText);
          req.onreadystatechange = ( ) => {
            if (req.readyState == 4 && req.status == 200) {
              location.reload();
            }
          };
          req.open('put', todo.tree.putLink , true);
          req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          req.send(`title=${todo.tree.titleText}&body=${todo.tree.bodyText}&priority=${todo.tree.priorityValue}&completed=true&completedDate=${timestamp}`);
        } else {
          req.onreadystatechange = ( ) => {
            if (req.readyState == 4 && req.status == 200) {
              location.reload();
            }
          };
          req.open('put', todo.tree.putLink , true);
          req.setRequestHeader("Content-type", "application/json");
          req.send(`{\"title\":\"${todo.tree.titleText}\",\"body\":\"${todo.tree.bodyText}\",\"priority\":\"${todo.tree.priorityValue}\",\"completed\":false}`);
        }
        // trash can button
      } else if (button.classList.contains('todo-delete-button')) {
        if (todo.tree.parent.classList.contains('deleted-todo')){

        } else {
          todo.tree.parent.classList.add('deleted-todo');
          todo.tree.parent.classList.remove('completed-todo');
          todo.tree.title.classList.add('font-white');
          todo.tree.title.setAttribute('contenteditable', false);
          todo.tree.body.setAttribute('contenteditable', false);
          todo.tree.priorityButton.setAttribute('disabled', true);
          todo.tree.completeButton.classList.add('inactive-todo-button');
          todo.tree.completeButton.setAttribute('disabled', true);

          setTimeout(( ) => {
            if (todo.tree.parent.classList.contains('deleted-todo')){
              todo.tree.parent.classList.remove('deleted-todo');
              todo.tree.title.classList.remove('font-white');
              todo.tree.completeButton.classList.remove('inactive-todo-button');
              todo.tree.completeButton.setAttribute('disabled', false);
              todo.tree.title.setAttribute('contenteditable', true);
              todo.tree.body.setAttribute('contenteditable', true);
              todo.tree.priorityButton.setAttribute('disabled', false);
            }
          }, 5000)
        }
        // disguard button
      } else if (button.classList.contains('todo-discard-button')) {
        if (button.classList.contains('inactive-todo-button')) return;
        todo.tree.title.innerText = todo.tree.titleText;
        todo.tree.body.innerText = todo.tree.bodyText;
        todo.tree.priorityButton.value = todo.tree.priorityValue;
        todo.tree.priorityButton.innerText = todo.tree.priorityText;
        todo.tree.priorityButton.classList = todo.tree.priorityClass;
        todo.classList = todo.tree.parentClass;
        todo.tree.saveButton.classList.add('inactive-todo-button');
        todo.tree.discardButton.classList.add('inactive-todo-button');
        todo.tree.bodyCount.value = maxBodyLength - todo.tree.body.innerText.length;
        todo.tree.titleCount.value = maxTitleLength - todo.tree.title.innerText.length;
        todo.tree.bodyCount.classList.add('hidden');
        todo.tree.titleCount.classList.add('hidden');
      }
    });
  };

  const completeButtons = document.getElementsByClassName('todo-complete-button'),
    trashButtons = document.getElementsByClassName('todo-delete-button'),
    discardButtons = document.getElementsByClassName('todo-discard-button');

  for (let i = 0, cmpBtnLen = completeButtons.length; i < cmpBtnLen; i++) {
    let editArray=[completeButtons[i],trashButtons[i],discardButtons[i]],
      todo = {};
    todo.tree = getTodoTree(completeButtons[i]);
    for (let i = 0, eBtnsLen = editArray.length; i < eBtnsLen; i ++) {
      editButtonFunction(editArray[i], todo);
    }
  }
};
