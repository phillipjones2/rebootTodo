const   mongoose = require('mongoose'),
           faker = require('faker'),
            Todo = require('./server/api/todo/todoModel'),
      formatDate = require('./routes/api').formatDate,
           today = new Date(),
             old = new Date(today.setDate(today.getDate() -2)),
           todos = [],
     priorityArr = [0, 1, 2];


mongoose.connect('mongodb://localhost/rebootTodo');
  const   db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to Mongo db');
  Todo.remove({}, (err) => {
    console.log('Todo collection removed');
    // ACTIVE TODO ENTRIES
    for (let i = 0; i < 8; i ++) {
      randomPriority = priorityArr[Math.floor(Math.random() * priorityArr.length)];
      let todo = new Todo({
        title: faker.lorem.sentence(),
        body: faker.lorem.sentence(),
        priority: randomPriority,
        formattedCreate: formatDate(new Date()),
        formattedUpdate: formatDate(new Date())
      });
      todo.save((err, todo) => {
        if (err) return console.error(err);
      });
    }

    //  COMPLETED TODO ENTRIES < THAN A DAY AGO
    for (let i = 0; i < 4; i ++) {
      randomPriority = priorityArr[Math.floor(Math.random() * priorityArr.length)];
      let todo = new Todo({
        title: faker.lorem.sentence(),
        body: faker.lorem.sentence(),
        priority: randomPriority,
        formattedCreate: formatDate(new Date()),
        formattedUpdate: formatDate(new Date()),
        completed: true,
        completedDate: new Date()
      });
      todo.save((err, todo) => {
        if (err) return console.error(err);
      });
    }

    //  COMPLETED TODO ENTRIES > THAN A DAY AGO
    for (let i = 0; i < 4; i ++) {
      randomPriority = priorityArr[Math.floor(Math.random() * priorityArr.length)];
      let todo = new Todo({
        title: faker.lorem.sentence(),
        body: faker.lorem.sentence(),
        priority: randomPriority,
        formattedCreate: formatDate(new Date()),
        formattedUpdate: formatDate(new Date()),
        completed: true,
        completedDate: old
      });
      todo.save((err, todo) => {
        if (err) return console.error(err);
      });
    }
    console.log('populated db');
  });
});
