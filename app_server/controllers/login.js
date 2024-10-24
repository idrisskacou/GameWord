const User  = require("./auth");
const bcrypt = require('bcryptjs');
const express = require("express");  // Correctly require express
const app = express();  // Initialize express app
app.use(express.urlencoded({ extended: true }));
/* Get homepage */
const login = (req, res) => {
    res.render("login", { title: "LOGIN" });

  };
const handlelogInsite = () => {
  alert("Logged In !!!")
};

  module.exports = {
    login,
    handlelogInsite,
    // postLogin,
  };
  