var express = require('express');
var router = express.Router();
const ctrMain = require('../controllers/main');
/* GET home page. */
router.get('/', ctrMain.index);

module.exports = router;
