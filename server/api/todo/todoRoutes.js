const router = require('express').Router(),
  logger = require('../../util/logger'),
  controller = require('./todoController'),
  formatDate = require('../../util/formatDate'),
  auth = require('../../auth/auth');

var today = new Date(),
    yesterday = new Date(today.setDate(today.getDate() -1)),
    thisWeek = new Date(today.setDate(today.getDate() - 7));

var checkUser = [auth.decodeToken(),auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
  .get(checkUser, controller.get)
  .post(checkUser,controller.post);

router.route('/:id')
  .get(checkUser, controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete);

module.exports = router;
