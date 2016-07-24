const mongoose = require('mongoose'),
      faker = require('Faker'),
      Todo = require('./modules/todoModel');

var todos = [];

mongoose.connect('mongodb://localhost/rebootTodo');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to Mongo db');
  Todo.remove({}, (err) => {
    console.log('Todo collection removed')
    for (let i = 0; i < 8; i ++) {
      let todo = new Todo({
        title: faker.lorem.sentence() ,
        body: faker.lorem.sentence()
      });
      todo.save((err, todo) => {
        if (err) return console.error(err);
        
      });
    }
    console.log('populated db');
  });
});
