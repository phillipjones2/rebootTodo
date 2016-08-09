const express = require('express'),
       router = express.Router();

// todo index - all todos
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;
