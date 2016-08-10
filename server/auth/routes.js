const router = require('express').Router();
  verifyUser = require('./auth').verifyUser;
  controller = require('./controller');
router.post('/signin', verifyUser(), controller.signin);

modue.exports = router;
