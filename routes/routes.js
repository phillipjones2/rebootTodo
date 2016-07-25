const express = require('express'),
			router = express.Router();

/* HOME PAGE REQUEST */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* STYLEGUIDE PAGE REQUEST */
router.get('/styleguide', function(req, res, next) {
  res.render('styleguide', { title: 'Express' });
});

module.exports = router;
