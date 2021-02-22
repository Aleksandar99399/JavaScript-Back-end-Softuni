const AppError = require('../middlewares/appError');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');
const expenseService = require('../services/expenseService');

exports.register = async (username, password, amount, next) => {
  try {
    const user = await User.create({ username, password, amount });

    let token = jwt.sign({ _id: user._id, username: user.username }, SECRET);

    return token;
  } catch (err) {
    next(new AppError(err.message, 404, 'register'));
  }
};

exports.login = async (username, password, next) => {
  try {
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePasswords(password, user.password))) {
      return next(new AppError('Invalid username or password', 401, 'login'));
    }

    let token = jwt.sign({ _id: user._id, username: user.username }, SECRET);

    return token;
  } catch (err) {
    next(new AppError(err.message, 404, 'login'));
  }
};

exports.getOneUser = async (userId, next) => {
  try {
    const user = await User.findById(userId).lean();
    const expenses = await expenseService.getAll(userId);
    console.log(userId);
    const totalAmout = await expenseService.getSum(userId);
    console.log(totalAmout);
    user.expenseCount = expenses.length;

    return user;
  } catch (err) {
    next(new AppError(err.message, 404, 'home'));
  }
};
