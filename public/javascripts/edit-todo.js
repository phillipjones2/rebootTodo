'use strict';

const saveEditedTodoButtons = document.getElementsByClassName('todo-save-button');
for (let i = 0, saveEditedTodoButtonsLen = saveEditedTodoButtons.length; i < saveEditedTodoButtonsLen; i++) {
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
  	req.send(`title=${todoTitle}&body=${todoBody}&priority=${priority}`);
  });
}
 //*****************************************************//
//--- TITLE DIFF FOR SAVE/DISCARD BUTTON ACTIVATION ---//
const titles = document.getElementsByClassName('todo-title'),
  maxTitleLength = 55;
for (let i = 0, titlesLen = titles.length; i < titlesLen; i++) {
  const title = titles[i],
    todo = getParentTodo(title);

  title.addEventListener('keyup', (e) => {
    const newText = `${title.innerText} ${todo.tree.body.innerText} ${todo.tree.priorityButton.value}`;
    compareNewAndOriginalText(todo, newText);
    // VALIDATE CHARACTER LENGTH
    console.log(todo.tree.titleCount.classList);
    todo.tree.titleCount.classList.remove('hidden');
    // todo.title.CountBox.classList.remove('hidden');
    todo.tree.titleCountValue = maxTitleLength - title.innerText.length;
    if (title.innerText.trim().length == 0 || title.innerText.length > maxTitleLength){
      todo.tree.saveButton.classList.add('inactive-todo-button');
      todo.tree.titleCount.classList.add('priority-text-2');
    } else {
      todo.tree.titleCount.classList.remove('priority-text-2');
    }
  });

  title.addEventListener('focus', (e) => {
    todo.tree.bodyCount.classList.add('hidden');
  });
}

 //*****************************************************//
//---  BODY DIFF FOR SAVE/DISCARD BUTTON ACTIVATION ---//
const bodies = document.getElementsByClassName('todo-body'),
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
    const todo = getParentTodo(button);
    rotatePriorities(button, button.parent,'border');
    const newText = `${button.parent.tree.title.innerText} ${button.parent.tree.body.innerText} ${button.parent.tree.priorityButton.value}`;
    compareNewAndOriginalText(todo, newText);
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
