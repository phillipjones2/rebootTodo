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

const todoEditPriorityButtons = document.getElementsByClassName('todo-edit-priority');
for (let button of todoEditPriorityButtons) {
  button.addEventListener('click', (e) => {
    rotatePriorities(button, [0, 1, 2], [
      'priority-bg-0',
      'priority-bg-1',
      'priority-bg-2',
    ]);
  });
}
