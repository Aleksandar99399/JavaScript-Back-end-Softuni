const exphbs = require('express-handlebars');
const express = require('express');
const cookieParser = require('cookie-parser');
const authentication = require('../middlewares/authentication');

module.exports = function (app) {
  app.engine('hbs', exphbs({ extname: 'hbs' }));
  app.set('view engine', 'hbs');

  app.use(express.static('public'));

  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());

  app.use(authentication.auth);
};
