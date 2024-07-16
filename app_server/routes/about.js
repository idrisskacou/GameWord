var express = require('express');
var router = express.Router();
const ctrAbout = require('../controllers/about');
/* GET home page. */
router.get('/about', ctrAbout.about);

module.exports = router;
