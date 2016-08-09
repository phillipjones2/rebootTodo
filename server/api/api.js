const router = require('express').Router();

router.use('/users', require('./user/userRoutes'));
router.use('/todos', require('./todo/todoRoutes'));

module.exports = router;
