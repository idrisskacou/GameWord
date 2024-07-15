var express = require('express');
var router = express.Router();
const ctrNews = require('../controllers/news');
/* GET users listing. */
router.get('/news', ctrNews.news);

module.exports = router;
