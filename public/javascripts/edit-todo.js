const applyEditTodoFunctionality = () => {
  const timestamp = new Date(),
    completeButtons = document.getElementsByClassName('complete-btn'),
    trashButtons = document.getElementsByClassName('trash-btn'),
    discardButtons = document.getElementsByClassName('discard-btn'),
    saveButtons = document.getElementsByClassName('save-btn'),
    priorityButtons = document.getElementsByClassName('priority-btn'),
    titles = document.getElementsByClassName('todo-title'),
    maxTitleLength = 55,
    bodies = document.getElementsByClassName('todo-body'),
    maxBodyLength = 140,
    indexDateElement = document.getElementsByClassName('indexDate'),
    today = new Date(),
    loginTodo = document.getElementById('login-todo'),
    registerTodo = document.getElementById('register-todo'),
    loginContent = document.getElementById('login-todo-content'),
    registerContent = document.getElementById('register-todo-content'),
    placerholder = document.getElementById('placerholder'),
  	loginCloseButton = document.getElementById('login-close-button'),
  	registerCloseButton = document.getElementById('register-close-button'),
    loginEmailField = document.getElementById('username'),
    loginPassField = document.getElementById('password'),
    registerEmailField = document.getElementById('usernameR'),
    registerPassField = document.getElementById('passwordR'),
    registerConfPassField = document.getElementById('passwordConfR'),
    loginUserBtn = document.getElementById('login-user-btn'),
    registerUserBtn = document.getElementById('register-user-btn');

   //*****************************************************//
  //--- TITLE DIFF FOR SAVE/DISCARD BUTTON ACTIVATION ---//
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
  for (let i = 0, bodiesLen = bodies.length; i < bodiesLen; i++) {
   let body = bodies[i],
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

//****************************************************************************//
// todo edit buttons fuctionality:  discard, complete, trash, save, priority
//***************************************************************************//

  const  editButtonFunction = (button, todo) => {
    button.addEventListener('click', (e) => {
      console.log(e);
      // complete button
      if (button.classList.contains('todo-complete-button')){
        if (!todo.tree.parent.hasAttribute('data-completed')){
          button.innerText = 'UNCOMPLETE';
          let ajaxObject = {
            method: "put",
            url: todo.tree.todoPutLink,
            async: true,
            send: `title=${todo.tree.titleText}&body=${todo.tree.bodyText}&priority=${todo.tree.priorityValue}&completed=true&completedDate=${timestamp}`,
            contentType: "application/x-www-form-urlencoded",
            headerKey: "Authorization",
            headerValue:`Bearer ${window.sessionStorage.accessToken}`,
            onSuccessResponse: location.reload()
          };
          ajaxCall(ajaxObject);
        } else {
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
        }
        // trash can button
      } else if (button.classList.contains('todo-delete-button')) {
        if (todo.tree.parent.classList.contains('deleted-todo')){
          // WHAT TO DO???
        } else {
          todo.tree.parent.classList.add('deleted-todo');
          todo.tree.parent.classList.remove('completed-todo');
          todo.tree.title.classList.add('font-white');
          todo.tree.title.setAttribute('contenteditable', false);
          todo.tree.body.setAttribute('contenteditable', false);
          todo.tree.priorityButton.setAttribute('disabled', true);
          todo.tree.completeButton.classList.add('inactive-todo-button');
          todo.tree.completeButton.setAttribute('disabled', true);

          setTimeout(() => {
            if (todo.tree.parent.classList.contains('deleted-todo')){
              todo.tree.parent.classList.remove('deleted-todo');
              todo.tree.title.classList.remove('font-white');
              todo.tree.title.setAttribute('contenteditable', true);
              todo.tree.body.setAttribute('contenteditable', true);
              todo.tree.completeButton.classList.remove('inactive-todo-button');
              todo.tree.completeButton.removeAttribute('disabled');
              todo.tree.priorityButton.removeAttribute('disabled');
            }
          }, 5000);
        }
        // discard button
      } else if (button.classList.contains('todo-discard-button')) {
        if (button.classList.contains('inactive-todo-button')) return;
        console.log(e);
        console.log('discard');
        todo.tree.title.innerText = todo.tree.titleText;
        todo.tree.body.innerText = todo.tree.bodyText;
        todo.tree.priorityButton.value = todo.tree.priorityValue;
        todo.tree.priorityButton.innerText = todo.tree.priorityText;
        todo.tree.priorityButton.classList = todo.tree.priorityClass;
        todo.tree.parent.classList = todo.tree.parentClass;
        todo.tree.saveButton.classList.add('inactive-todo-button');
        todo.tree.discardButton.classList.add('inactive-todo-button');
        todo.tree.bodyCount.value = maxBodyLength - todo.tree.body.innerText.length;
        todo.tree.titleCount.value = maxTitleLength - todo.tree.title.innerText.length;
        todo.tree.bodyCount.classList.add('hidden');
        todo.tree.titleCount.classList.add('hidden');
        // save button
       } else if (button.classList.contains("todo-save-button")) {
        if (button.classList.contains('inactive-todo-button')) { return; }
        let ajaxObject = {
          method: "put",
          url: todo.tree.todoPutLink,
          async: true,
          send: `title=${todo.tree.title.innerText}&body=${todo.tree.body.innerText}&priority=${todo.tree.priorityButton.value}`,
          contentType: "application/x-www-form-urlencoded",
          headerKey: "Authorization",
          headerValue: `Bearer ${window.sessionStorage.accessToken}`,
          onSuccessResponse: location.reload()
        };
        ajaxCall(ajaxObject);

        // priority button
      } else if (button.classList.contains("todo-edit-priority")) {
        rotatePriorities(button, todo.tree.parent,'border');
        const newText = `${todo.tree.title.innerText} ${todo.tree.body.innerText} ${todo.tree.priorityButton.value}`;
        compareNewAndOriginalText(todo, newText);
      }
    });
  };

  for (let i = 0, cmpBtnLen = completeButtons.length; i < cmpBtnLen; i++) {
    let editArray=[ completeButtons[i], trashButtons[i],
                    discardButtons[i], saveButtons[i], priorityButtons[i] ],
      todo = {};
    todo.tree = getTodoTree(completeButtons[i]);
    for (let i = 0, eBtnsLen = editArray.length; i < eBtnsLen; i ++) {
      editButtonFunction(editArray[i], todo);
    }
  }

  for(let i = 0, ideLen = indexDateElement.length; i < ideLen; i++ ) {
  	indexDateElement[i].innerHTML = '<em>'+formatDate(today)+'</em>';
  }

  // function to remove the placeholder text when a user click in the field
  // and returns it if the user didn't enter any characters
  function userPass(id) {
    let ele = document.getElementById(id);
    ele.addEventListener('click', function(e) {
      let check = ['Email','Password','Confirm Password'];
      if(this.innerText == check[0] || this.innerText == check[1] || this.innerText == check[2]) {
        var remember = this.innerText;
        this.innerText = '';
      }
      this.addEventListener('blur', (e) => {
        if(this.innerText === '') {
          this.innerText = remember;
        }
      });
    });
  }

  //function to make login user btn active when fields are not blank
  function activateLogin(ele) {
    ele.addEventListener('keyup', function(e) {
      if (loginEmailField.innerText !== "Email" && loginEmailField.innerText !== "" &&
          loginPassField.innerText !== "Password" && loginPassField.innerText !== "") {
        loginUserBtn.classList.remove('inactive-todo-button');
      } else {
        loginUserBtn.classList.add('inactive-todo-button');
      }
    });
  }

  function activateRegister(ele) {
    ele.addEventListener('keyup', function(e) {
      if (registerEmailField.innerText !== "Email" && registerEmailField.innerText !== "" &&
          registerPassField.innerText !== "Password" && registerPassField.innerText !== "" &&
          registerConfPassField.innerText !== "Confirm Password" && registerConfPassField.innerText !== "" &&
          registerConfPassField.innerText === registerPassField.innerText) {
        registerUserBtn.classList.remove('inactive-todo-button');
      } else {
        registerUserBtn.classList.add('inactive-todo-button');
      }
    });
  }

  // function to toggle between the login and register box
  function logRegister(id1, id2) {
    let btn1 = document.getElementById(id1),
      btn2 = document.getElementById(id2),
      prnt1 = btn1.parentElement.parentElement,
      prnt2 = btn2.parentElement.parentElement;

    btn1.addEventListener('click', function (e) {
      if(prnt1.classList.contains('hidden')) {
        prnt1.classList.remove('hidden');
        prnt2.classList.add('hidden');
      } else {
        prnt1.classList.add('hidden');
        prnt2.classList.remove('hidden');
      }
    });
    btn2.addEventListener('click', function (e) {
      if(prnt1.classList.contains('hidden')) {
        prnt1.classList.remove('hidden');
        prnt2.classList.add('hidden');
      } else {
        prnt1.classList.add('hidden');
        prnt2.classList.remove('hidden');
      }
    });
  }

  if (loginTodo){
    let loginArray = [loginEmailField, loginPassField],
      registerArray = [registerEmailField, registerPassField, registerConfPassField]

    loginArray.forEach((field) => {
      activateLogin(field)
    })
    registerArray.forEach((field) => {
      activateRegister(field)
    })

    logRegister('register-btn', 'login-btn')

    if (loginTodo !== null) {
      const passArray = ['username', 'password', 'usernameR', 'passwordR', 'passwordConfR']
      for (let i = 0, passLen = passArray.length; i < passLen; i++) {
    		userPass(passArray[i])
    }
    }
  // if email and pass are good send ajax call for loginTodo
    loginUserBtn.addEventListener('click', function (e) {
      if (loginUserBtn.classList.contains('inactive-todo-button')) { return }
      let ajaxObject = {
        method: 'post',
        url: 'auth/signin',
        async: true,
        send: `username=${loginEmailField.innerText}&password=${loginPassField.innerText}`,
        contentType: 'application/x-www-form-urlencoded',
        headerKey: 'Authorization',
        headerValue: `Bearer ${window.sessionStorage.accessToken}`,
        onSuccessResponse: saveToken
      }
      ajaxCall(ajaxObject)
    })

    // if email and pass are good send ajax call for regTodo
    registerUserBtn.addEventListener('click', function (e) {
      if (registerUserBtn.classList.contains('inactive-todo-button')) { return }
      let ajaxObject = {
        method: 'post',
        url: 'api/users',
        async: true,
        send: `username=${loginEmailField.innerText}&password=${loginPassField.innerText}`,
        contentType: 'application/x-www-form-urlencoded',
        onSuccessResponse: saveToken
      }
      ajaxCall(ajaxObject)
    })
  }
}
