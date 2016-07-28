'use strict';

const saveEditedTodoButtons = document.getElementsByClassName('todo-save-button');
for (let button of saveEditedTodoButtons) {
  let parentID = button.getAttribute('todo-parent'),
      parent = document.getElementById(parentID),
      todoTitle = parent.querySelector('.todo-title').innerText,
      todoBody = parent.querySelector('.todo-body').innerText.trim(),
      priority = parent.querySelector('.todo-edit-priority').value,
      objectID = trimQuotes(parent.getAttribute('todo-object-id')),
      putLink = `/${objectID}`;

  button.addEventListener('click', (e) => {
    if (button.classList.contains('inactive-todo-button')) { return;}
    let parentID = button.getAttribute('todo-parent'),
        parent = document.getElementById(parentID),
        todoTitle = parent.querySelector('.todo-title').innerText,
        todoBody = parent.querySelector('.todo-body').innerText.trim(),
        priority = parent.querySelector('.todo-edit-priority').value,
        objectID = trimQuotes(parent.getAttribute('todo-object-id')),
        putLink = `/${objectID}`;

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

for (let title of titles) {
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

for (let body of bodies) {
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
   const todoTree = button.parent.tree,
         bodyElement = button.parent.querySelector('.todo-body'),
         titleElement = button.parent.querySelector('.todo-title'),
         bodyCount =  button.parent.querySelector('.todo-body-character-count'),
         titleCount = button.parent.querySelector('.todo-title-character-count');
   if (button.classList.contains('inactive-todo-button')) {return;}
   else {

     todoTree.title.innerText = todoTree.titleText;
     todoTree.body.innerText = todoTree.bodyText;
     todoTree.priorityButton.value = todoTree.priority;
     todoTree.priorityButton.innerText = todoTree.priorityText;
     todoTree.priorityButton.classList = todoTree.priorityClass;
     todoTree.parent.classList = todoTree.parent.originalClasses;
     todoTree.saveButton.classList.add('inactive-todo-button');
     todoTree.discardButton.classList.add('inactive-todo-button');
     bodyCount.value = maxBodyLength - bodyElement.innerText.length;
     titleCount.value = maxTitleLength - titleElement.innerText.length;
     bodyCount.classList.add('hidden');
     titleCount.classList.add('hidden');
   }
 });
}
