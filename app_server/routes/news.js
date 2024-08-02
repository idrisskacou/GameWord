var express = require('express');
var axios = require("axios");
var router = express.Router();
const ctrNews = require('../controllers/news');
/* GET users listing. */
router.get('/news', ctrNews.news);


module.exports = router;
