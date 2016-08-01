const express = require('express'),
			router  =	express.Router(),
			babel   = require('babel-core'),
			fs      = require('fs');

const jsPaths = {
	main     : './public/javascripts/main.js',
	newTodoForm: './public/javascripts/new-todo-form.js',
	functions: './public/javascripts/functions.js',
	editTodo: './public/javascripts/edit-todo.js',
	mobileEvents: './public/javascripts/mobile-events.js',
	deleteTodo: './public/javascripts/delete-todo.js',
	winterfresh: './public/javascripts/winterfresh.js',
	about: './public/javascripts/about.js',
	boxGrid: './public/javascripts/box-grid.js',
	polyfill: './public/javscripts/polyfill.js'
};


router.get('/box-grid', (req, res, next) => {
	babel.transformFile(jsPaths.boxGrid, {
		presets: ['es2015']
	}, (err, data) => {
		if (err) console.log(err);
		res.send(data.code);
	});
});

router.get('/polyfill', (req, res, next) => {
	fs.readFile(jsPaths.polyfill, 'utf8', (err, data) => {
		res.send(data);
	})
});

/* NEW-TODO-FORM.JS FILE REQUEST */
router.get('/new-todo-form', (req, res, next) => {
	babel.transformFile(jsPaths.newTodoForm, {
		presets: ['es2015']
	}, (err, data) => {
		if (err) console.log(err);
		res.send(data.code);
	});
});

/* NEW-TODO-FORM.JS FILE REQUEST */
router.get('/about', (req, res, next) => {
	babel.transformFile(jsPaths.about, {
		presets: ['es2015']
	}, (err, data) => {
		if (err) console.log(err);
		res.send(data.code);
	});
});

/* EDIT-TODO-FORM.JS FILE REQUEST */
router.get('/edit-todo', (req, res, next) => {
	babel.transformFile(jsPaths.editTodo, {
		presets: ['es2015']
	}, (err, data) => {
		if (err) console.log(err);
		res.send(data.code);
	});
});


/* FUNCTIONS.JS FILE REQUEST */
router.get('/functions', (req, res, next) => {
	babel.transformFile(jsPaths.functions, {
		presets: ['es2015']
	}, (err, data) => {
		if (err) console.log(err);
		res.send(data.code);
	});
});

/* SWIPE FUNCTIONALITY */
router.get('/mobile-events', (req, res, next) => {
	babel.transformFile(jsPaths.mobileEvents, {
		presets: ['es2015']
	}, (err, data) => {
		if (err) console.log(err);
		res.send(data.code);
	});
});

/* NEW-TODO-FORM.JS FILE REQUEST */
router.get('/winterfresh', (req, res, next) => {
	babel.transformFile(jsPaths.winterfresh, {
		presets: ['es2015']
	}, (err, data) => {
		if (err) console.log(err);
		res.send(data.code);
	});
});

module.exports = router;
