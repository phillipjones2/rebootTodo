const express = require('express'),
       router = express.Router();

// todo index - all todos
router.get('/', (req, res) => {
    res.render('index', {title: 'todo app'});
});
router.get('/loggedin', (req, res) => {
    res.render('loggedinuser', {title: 'todo app'});
});

module.exports = router;
