const router = require('express').Router();

router.use('/users', require('./user/userRoutes'));
router.use('/todos', require('./todo/todoRoutes'));
router.use('/universalTodos', require('./universalTodo/universalTodoRoutes'));

module.exports = router;
