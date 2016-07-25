   mongoose = require('mongoose'),
      faker = require('faker'),
       Todo = require('./modules/todoModel'),
 formatDate = require('./routes/todos').formatDate,

       todos = [],
    priorityArr = [0, 1, 2],


mongoose.connect('mongodb://localhost/rebootTodo');
  var     db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to Mongo db');
  Todo.remove({}, (err) => {
    console.log('Todo collection removed');
    for (let i = 0; i < 8; i ++) {
      randomPriority = priorityArr[Math.floor(Math.random() * priorityArr.length)];
      let todo = new Todo({
        title: faker.lorem.sentence(),
        body: faker.lorem.sentence(),
        priority: randomPriority,
        formatedCreate: formatDate(new Date()),
        formatedUpdate: formatDate(new Date())
      });
      console.log(todo);
      todo.save((err, todo) => {
        if (err) return console.error(err);

      });
    }
    console.log('populated db');
  });
});
