const addTodoPriorityButton = document.getElementById('add-todo-priority-button'),
      priorities = [{priority:'priority: low', priorityClass:'priority-bg-0'},
                    {priority:'priority: medium', priorityClass:'priority-bg-1'},
                    {priority:'priority: high', priorityClass:'priority-bg-2'}
                  ];

let addTodoPriorityButtonClicks = 0,
    addTodoPriorityButtonClassRemove = 2;
    // editTodoPriorityButtonClicks =

addTodoPriorityButton.addEventListener('click',(e) => {
  e.preventDefault();

  if (addTodoPriorityButtonClicks == 2) {
    addTodoPriorityButtonClicks = 0;
  } else {
    addTodoPriorityButtonClicks++;
  }

  if (addTodoPriorityButtonClassRemove == 2) {
    addTodoPriorityButtonClassRemove = 0;
  } else {
    addTodoPriorityButtonClassRemove++;
  }

  addTodoPriorityButton.innerText = priorities[addTodoPriorityButtonClicks].priority;
  addTodoPriorityButton.value = addTodoPriorityButtonClicks;
  addTodoPriorityButton.classList.remove(priorities[addTodoPriorityButtonClassRemove].priorityClass);
  addTodoPriorityButton.classList.add(priorities[addTodoPriorityButtonClicks].priorityClass);

  // change inner html text to Priority MED, height
  // remove the previous class and add the new class
});

// const todoEditPriorityButtons = document.getElementsByClassName('todo-edit-priority');
//
// for (let button of todoEditPriorityButtons) {
//   let buttonValue = Number(button.value);
//   let buttonValuePlus;
//   if (buttonValue === 2 ) {
//     buttonValuePlus = 0;
//   } else {
//     buttonValuePlus = buttonValue + 1;
//   }
//   let editTodoPriorityButtonClicks = buttonValue;
//   let editTodoPriorityButtonClassRemove = buttonValuePlus;
//
//   console.log(`END editTodoPriorityButtonClicks: ${editTodoPriorityButtonClicks}` );
//   console.log(`END editTodoPriorityButtonClassRemove: ${editTodoPriorityButtonClassRemove}` );
//
//   button.addEventListener('click', (e) => {
//
//     button.innerText = priorities[editTodoPriorityButtonClicks].priority;
//     button.value = editTodoPriorityButtonClicks;
//     console.log(`editTodoPriorityButtonClassRemove: ${editTodoPriorityButtonClassRemove}` );
//     console.log(`REMOVE: ${priorities[editTodoPriorityButtonClassRemove].priorityClass}`);
//
//     if (editTodoPriorityButtonClicks === 2) {
//       editTodoPriorityButtonClicks = 0;
//     } else {
//       editTodoPriorityButtonClicks += 1;
//     }
//     console.log(`END editTodoPriorityButtonClicks: ${editTodoPriorityButtonClicks}` );
//     if (editTodoPriorityButtonClassRemove == 2) {
//       editTodoPriorityButtonClassRemove = 0;
//     } else {
//       editTodoPriorityButtonClassRemove += 1;
//     }
//     console.log(`END editTodoPriorityButtonClassRemove: ${editTodoPriorityButtonClassRemove}` );
//
//
//     button.classList.remove(priorities[editTodoPriorityButtonClassRemove].priorityClass);
//     console.log(`editTodoPriorityButtonClicks: ${editTodoPriorityButtonClicks}` );
//     console.log(`ADD: ${priorities[editTodoPriorityButtonClicks].priorityClass}`);
//     button.classList.add(priorities[editTodoPriorityButtonClicks].priorityClass);
//
//
//   });
// }
