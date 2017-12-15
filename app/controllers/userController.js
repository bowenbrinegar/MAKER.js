
const db = require('../models');
const path = require('path');

exports.loginForm = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/loginForm.html"));
};
