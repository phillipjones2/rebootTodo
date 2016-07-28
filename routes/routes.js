const express = require('express'),
			router = express.Router();

router.get('/', (req, res, next) => {
  res.render('about');
});

/* STYLEGUIDE PAGE REQUEST */
router.get('/styleguide', (req, res, next) => {
  res.render('styleguide', { title: 'Express' });
});

module.exports = router;
