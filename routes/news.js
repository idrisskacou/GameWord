var express = require('express');
var router = express.Router();
const controller = require('../app_server/controllers/news');
/* GET users listing. */
router.get('/news',controller.news);

module.exports = router;