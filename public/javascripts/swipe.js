const	todos = getElsByClass('todo-box'),
			todosLen = todos.length;
//*******************************//
//--- TODO SWIPE FUNCTIONALITY --//
for (let todo of todos) {
 todo.style.height = todo.scrollY;
 let	touchStartX, touchStartY;

 todo.tree = getTodoTree(todo);
 todo.originalClasses = `${todo.classList}`;

 todo.addEventListener('touchstart', (e) => {
   if (document.body.clientWidth >= 520) { return }
   touchStartX = e.touches[0].screenX;
   touchStartY = e.touches[0].screenY;
 }); // touchstart

 todo.addEventListener('touchend', (e) => {
   if (document.body.clientWidth >= 520) { return }

   const thisTodo = validateTargetAsTodo(e),
         thisParentID = thisTodo.getAttribute('id'),
         touchEndX = e.changedTouches[0].screenX,
         touchEndY = e.changedTouches[0].screenY,
         todoWidth = todo.scrollWidth,
         todoHeight = todo.scrollHeight,
         swipeXDifference = touchStartX - touchEndX,
         distance = Math.abs(swipeXDifference),
         wavier = Math.abs(touchStartY - touchEndY),
         rightSwipe = (swipeXDifference < 0 ? true : false),
         validSwipe = (wavier < todoHeight && distance > todoWidth / 2);

   // const openTodoHeight = getOpenTodoHeight(thisTodo, thisParentID);
   handleTodoTap(distance, wavier, todo, thisParentID);

   if (!validSwipe) { return }

   else {
     const thisTodoTitle = getElByQuery(`h3[todo-parent=${thisParentID}`);

     if (rightSwipe) {
       if (thisTodo.classList.contains('deleted-todo')) {
         thisTodo.classList.remove('deleted-todo');
         thisTodo.classList.remove('completed-todo');
         thisTodoTitle.classList.remove('font-white');

       } else {
         thisTodo.classList.add('deleted-todo');
         thisTodo.classList.remove('completed-todo');
         thisTodoTitle.classList.add('font-white');
       } // else

     } else { // If left swipe...
       if (thisTodo.classList.contains('completed-todo')) {
         thisTodo.classList.remove('completed-todo');
         thisTodo.classList.remove('deleted-todo');
         thisTodoTitle.classList.remove('font-white');

       } else {
         thisTodo.classList.add('completed-todo');
         thisTodoTitle.classList.add('font-white');
       }
     } // else
   } // else
 }); // touchend
} // for
