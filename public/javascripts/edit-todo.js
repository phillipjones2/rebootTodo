'use strict';

const saveEditedTodoButtons = document.getElementsByClassName('todo-save-button');
for (let i = 0, saveEditedTodoButtonsLen = saveEditedTodoButtons.length; i < saveEditedTodoButtonsLen; i++) {
  const button = saveEditedTodoButtons[i];
  // let parentID = button.getAttribute('todo-parent'),
  //     parent = document.getElementById(parentID),
  //     todoTitle = parent.querySelector('.todo-title').innerText,
  //     todoBody = parent.querySelector('.todo-body').innerText.trim(),
  //     priority = parent.querySelector('.todo-edit-priority').value,
  //     objectID = parent.getAttribute('todo-object-id'),
  //     putLink = "/" + objectID;

  button.addEventListener('click', (e) => {
    if (button.classList.contains('inactive-todo-button')) { return;}
    let parentID = button.getAttribute('todo-parent'),
        parent = document.getElementById(parentID),
        todoTitle = parent.querySelector('.todo-title').innerText,
        todoBody = parent.querySelector('.todo-body').innerText.trim(),
        priority = parent.querySelector('.todo-edit-priority').value,
        objectID = parent.getAttribute('todo-object-id'),
        putLink = "/" + objectID;

  	const req = new XMLHttpRequest();
    console.log(putLink);
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
const titles = getElsByClass('todo-title'),
      maxTitleLength = 55;

for (let i = 0, titlesLen = titles.length; i < titlesLen; i++) {
 const title = titles[i]
 title.parent = getParentTodo(title);
 const titleCount = title.parent.querySelector('.todo-title-character-count'),
       titleCountBox = title.parent.querySelector('.todo-title-character-count-box');

  title.addEventListener('keyup', (e) => {
    const newText = `${title.innerText} ${title.parent.tree.body.innerText} ${title.parent.tree.priorityButton.value}`;
    compareNewAndOriginalText(title, newText);

    // VALIDATE CHARACTER LENGTH
    titleCount.classList.remove('hidden');
    titleCountBox.classList.remove('hidden');
    titleCount.value = maxTitleLength - title.innerText.length;
    console.log(title.innerText.trim().length);
    if (title.innerText.trim().length == 0){
      title.parent.tree.saveButton.classList.add('inactive-todo-button');
      titleCount.classList.add('priority-text-2');
    } else if (title.innerText.length > maxTitleLength ) {
      title.parent.tree.saveButton.classList.add('inactive-todo-button');
      titleCount.classList.add('priority-text-2');
    } else {
      titleCount.classList.remove('priority-text-2');
    }
  });

  title.addEventListener('focus', (e) => {
    title.parent.querySelector('.todo-body-character-count').classList.add('hidden');
  });
}

 //*****************************************************//
//---  BODY DIFF FOR SAVE/DISCARD BUTTON ACTIVATION ---//
const bodies = getElsByClass('todo-body'),
      maxBodyLength = 140;

for (let i = 0, bodiesLen = bodies.length; i < bodiesLen; i++) {
 const body = bodies[i];
 body.parent = getParentTodo(body);
 const bodyCount = body.parent.querySelector('.todo-body-character-count'),
       bodyCountBox = body.parent.querySelector('.todo-body-character-count-box')

  body.addEventListener('keyup', (e) => {
    const newText = `${body.parent.tree.title.innerText} ${body.parent.tree.body.innerText} ${body.parent.tree.priorityButton.value}`;
    compareNewAndOriginalText(body, newText);

    // VALIDATE CHARACTER LENGTH
    bodyCount.classList.remove('hidden');
    bodyCountBox.classList.remove('hidden')
    bodyCount.value = maxBodyLength - body.innerText.length;

    if (body.innerText.length > maxBodyLength ) {
     body.parent.tree.saveButton.classList.add('inactive-todo-button');
     bodyCount.classList.add('priority-text-2');
    } else {
     bodyCount.classList.remove('priority-text-2');
    }
  });

  body.addEventListener('focus', (e) => {
    body.parent.querySelector('.todo-title-character-count').classList.add('hidden');
  });
}

 //********************************************************//
//--- PRIORITY DIFF FOR SAVE/DISCARD BUTTON ACTIVATION ---//
const todoEditPriorityButtons = document.getElementsByClassName('todo-edit-priority');
for (let i = 0, todoEditPriorityButtonsLen = todoEditPriorityButtons.length; i < todoEditPriorityButtonsLen; i++) {
 const button = todoEditPriorityButtons[i];
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
for (let i = 0, discardButtonsLen = discardButtons.length; i < discardButtonsLen; i++) {
  let button = discardButtons[i]
  button.addEventListener('click', (e) => {

    const todo = getParentTodo(button);

    if (button.classList.contains('inactive-todo-button')) {return;}
     else {
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
}
