'use strict';

const saveEditedTodoButtons = document.getElementsByClassName('todo-save-button');
for (let button of saveEditedTodoButtons) {
  let parentID = button.getAttribute('todo-parent'),
      parent = document.getElementById(parentID),
      todoTitle = parent.querySelector('.todo-title').innerText,
      todoBody = parent.querySelector('.todo-body').innerText.trim(),
      priority = parent.querySelector('.todo-edit-priority').value,
      objectID = parent.getAttribute('todo-object-id').slice(1,-1),
      putLink = `/${objectID}`;

  button.addEventListener('click', (e) => {
    let parentID = button.getAttribute('todo-parent'),
        parent = document.getElementById(parentID),
        todoTitle = parent.querySelector('.todo-title').innerText,
        todoBody = parent.querySelector('.todo-body').innerText.trim(),
        priority = parent.querySelector('.todo-edit-priority').value,
        objectID = parent.getAttribute('todo-object-id').slice(1,-1),
        putLink = `/${objectID}`;

  	const req = new XMLHttpRequest();
  	req.open('put', putLink , true);
  	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	req.send(`title=${todoTitle}&body=${todoBody}&priority=${priority}`);

  	setTimeout(() => {
  		location.reload();
  	}, 150);
  });
}

 //*****************************************************//
//--- TITLE DIFF FOR SAVE/DISCARD BUTTON ACTIVATION ---//
const titles = getElsByClass('todo-title');
for (let title of titles) {
 title.parent = getParentTodo(title);
 title.addEventListener('keyup', (e) => {
   const newText = `${title.innerText} ${title.parent.tree.body.innerText} ${title.parent.tree.priorityButton.value}`;
   compareNewAndOriginalText(title, newText);
 });
}

 //*****************************************************//
//---  BODY DIFF FOR SAVE/DISCARD BUTTON ACTIVATION ---//
const bodies = getElsByClass('todo-body');
for (let body of bodies) {
 body.parent = getParentTodo(body);
 body.addEventListener('keyup', (e) => {
   const newText = `${body.parent.tree.title.innerText} ${body.parent.tree.body.innerText} ${body.parent.tree.priorityButton.value}`;
   compareNewAndOriginalText(body, newText);
 });
}

 //********************************************************//
//--- PRIORITY DIFF FOR SAVE/DISCARD BUTTON ACTIVATION ---//
const todoEditPriorityButtons = document.getElementsByClassName('todo-edit-priority');
for (let button of todoEditPriorityButtons) {
 button.addEventListener('click', (e) => {
   button.parent = getParentTodo(button);
   rotatePriorities(button, button.parent,'border');
   const newText = `${button.parent.tree.title.innerText} ${button.parent.tree.body.innerText} ${button.parent.tree.priorityButton.value}`;
   compareNewAndOriginalText(button, newText);
 });
}

 //************************************//
//--- DISCARD BUTTON FUNCTIONALITY ---//
const discardButtons = getElsByClass('todo-discard-button');
for (let button of discardButtons) {
 button.addEventListener('click', (e) => {
   button.parent = getParentTodo(button);
   const todoTree = button.parent.tree;
   if (button.classList.contains('inactive-todo-button')) {
     return;
   } else {
     todoTree.title.innerText = todoTree.titleText;
     todoTree.body.innerText = todoTree.bodyText;
     todoTree.priorityButton.value = todoTree.priority;
     todoTree.priorityButton.innerText = todoTree.priorityText;
     todoTree.priorityButton.classList = todoTree.priorityClass;
     todoTree.parent.classList = todoTree.parent.originalClasses;
     todoTree.saveButton.classList.add('inactive-todo-button');
     todoTree.discardButton.classList.add('inactive-todo-button');
   }
 });
}


///////////////////////
//////////////////////
