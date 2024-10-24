const express = require("express");
const router = express.Router();
const launchcontrollersdata = require('../controllers/launchcontrollersdata');
router
  .route("/api")
  .get(launchcontrollersdata);

module.exports = router;
