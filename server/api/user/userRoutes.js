const router = require('express').Router(),
  logger = require('../../util/logger'),
  controller = require('./userController'),
  auth = require('../../auth/auth');

// setup boilerplate route jsut to satisfy a request
// for building

var checkUser = [auth.decodeToken(),auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
  .get(checkUser, controller.get)
  .post(controller.post);

router.route('/:id')
  .get(checkUser, controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete);

module.exports = router;
