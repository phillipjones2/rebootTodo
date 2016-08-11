const express = require('express'),
			router  =	express.Router(),
			babel   = require('babel-core'),
			fs      = require('fs');

// /scripts
router.get('*', (req, res, next) => {
	babel.transformFile(`./public/javascripts/${req.url}`, {
		presets: ['es2015']
	}, (err, data) => {
		if (err) console.log(err);
		res.send(data.code);
	});
});

module.exports = router;
