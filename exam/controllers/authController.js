const router = require('express').Router();
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');
const AppError = require('../middlewares/appError');
const User = require('../models/userModel');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res, next) => {
  const { username, password, repeatPassword, amount } = req.body;

  if (password !== repeatPassword) {
    return next(new AppError('Passwords should match', 400, 'register'));
  }

  const checkUser = await User.findOne({ username });
  if (checkUser) {
    return next(new AppError('Username is duplicate', 400, 'register'));
  }

  try {
    const token = await authService.register(username, password, amount, next);

    if (token) {
      res.cookie(COOKIE_NAME, token, { httpOnly: true });

      res.redirect('/');
    }
  } catch (err) {
    next(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const token = await authService.login(username, password, next);

    if (token) {
      res.cookie(COOKIE_NAME, token, { httpOnly: true });

      res.redirect('/');
    }
  } catch (err) {
    next(err);
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.redirect('/');
});

router.get('/:userId/details', async (req, res, next) => {
  try {
    const user = await authService.getOneUser(req.params.userId, next);

    if (user) {
      res.render('account-info', { user });
    }
  } catch (err) {
    next(new AppError(err.message, 404, 'home'));
  }
});

router.post('/:userId/update', async (req, res, next) => {
  const sum = Number(req.body.refill);

  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { amount: sum }
    );

    if (user) {
      res.redirect('/');
    }
  } catch (err) {
    next(new AppError(err.message, 404, 'home'));
  }
});

module.exports = router;
