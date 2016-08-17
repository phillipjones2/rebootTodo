const express = require('express'),
       router = express.Router();

router.get('/', (req, res) => {
    res.render('login', {title: 'todo app'});
});

module.exports = router;
