const addTodoPriorityButton = document.getElementById('add-todo-priority-button'),
      priorities = [{priority:'priority: low', priorityClass:'priority-bg-0'},
                    {priority:'priority: medium', priorityClass:'priority-bg-1'},
                    {priority:'priority: high', priorityClass:'priority-bg-2'}
                  ];

let addTodoPriorityButtonClicks = 0,
    addTodoPriorityButtonClassRemove = 2;

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
  console.log(addTodoPriorityButton.value);

  // change inner html text to Priority MED, height
  // remove the previous class and add the new class


});
