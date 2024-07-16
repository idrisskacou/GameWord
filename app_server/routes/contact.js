var express = require('express');
var router = express.Router();
const ctrContact = require('../controllers/contact');
/* GET home page. */
router.get('/contact', ctrContact.contact);

module.exports = router;
