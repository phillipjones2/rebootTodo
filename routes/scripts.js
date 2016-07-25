const express = require('express'),
			router  =	express.Router(),
			babel   = require('babel-core'),
			fs      = require('fs');

const jsPaths = {
	main     : './public/javascripts/main.js',
	priority : './public/javascripts/priority.js'
};


/* MAIN.JS FILE REQUEST */
router.get('/main', (req, res, next) => {
	babel.transformFile(jsPaths.main, {
		presets: ['es2015']
	}, (err, data) => {
		if (err) console.log(err);
		res.send(data.code);
	});
});

/* MAIN.JS FILE REQUEST */
router.get('/priority', (req, res, next) => {
	babel.transformFile(jsPaths.priority, {
		presets: ['es2015']
	}, (err, data) => {
		if (err) console.log(err);
		res.send(data.code);
	});
});

module.exports = router;
