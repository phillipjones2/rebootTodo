

const express = require('express'),
			router  =	express.Router(),
			winterfresh = require(`${__dirname}/../winterfresh.js`);

router.get('/fresh?', (req, res) => winterfresh(res));

module.exports = router;