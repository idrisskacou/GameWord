var express = require('express');
var router = express.Router();
const ctrLogin = require('../controllers/login');
/* GET home page. */
router.get('/login', ctrLogin.login);
router.post('/');

// router.route

module.exports = router;


