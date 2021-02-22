const exphbs = require('express-handlebars');
const express = require('express');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');

module.exports = function (app) {
  app.engine(
    'hbs',
    exphbs({
      extname: 'hbs' //extension
      //   layoutsDir,
      //   partialsDir
    })
  );
  app.set('view engine', 'hbs');

  app.use('/static', express.static('public'));

  //parse all body from forms in html
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());

  app.use(auth);
};
