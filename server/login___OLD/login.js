const router = require('express').Router(),
  logger = require('../util/logger'),
  controller = require('../api/todo/todoController'),
  formatDate = require('../util/formatDate'),
  auth = require('../auth/auth');

var today = new Date(),
    yesterday = new Date(today.setDate(today.getDate() -1)),
    thisWeek = new Date(today.setDate(today.getDate() - 7));

var checkUser = [auth.decodeToken(),auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  .post(controller.post);

router.route('/:id')
  .get( controller.getOne)
  .put( controller.put)
  .delete( controller.delete);

module.exports = router;
