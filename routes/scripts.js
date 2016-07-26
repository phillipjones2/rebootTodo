const express = require('express'),
			router  =	express.Router(),
			babel   = require('babel-core'),
			fs      = require('fs');

const jsPaths = {
	main     : './public/javascripts/main.js',
	priority : './public/javascripts/priority.js',
	newTodoForm: './public/javascripts/new-todo-form.js',
	functions: './public/javascripts/functions.js',
	editTodo: './public/javascripts/edit-todo.js'
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

/* PRIORITY.JS FILE REQUEST */
router.get('/priority', (req, res, next) => {
	babel.transformFile(jsPaths.priority, {
		presets: ['es2015']
	}, (err, data) => {
		if (err) console.log(err);
		res.send(data.code);
	});
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

/* NEW-TODO-FORM.JS FILE REQUEST */
// router.get('/new-todo-form', (req, res, next) => {
// 	babel.transformFile(jsPaths.newTodoForm, {
// 		presets: ['es2015']
// 	}, (err, data) => {
// 		if (err) console.log(err);
// 		res.send(data.code);
// 	});
// });

module.exports = router;
