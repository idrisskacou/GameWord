const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.User = (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
};