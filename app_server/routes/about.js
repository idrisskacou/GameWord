var express = require('express');
var router = express.Router();
const ctrAbout = require('../controllers/about');
/* GET home page. */
router.get('/about', function(req, res, next) {
    res.render("about",{title: "History of launch"});
});

module.exports = router;
