const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');
const router = require('../controllers/authController');

const register = (username, password) => {
  let user = new User({ username, password });

  return user.save();
};

const login = async (username, password, next) => {
  let user = await User.findOne({ username });

  if (!user) {
    throw { message: 'No such user', status: 404 };
  }

  let areEqual = await bcrypt.compare(password, user.password);

  if (!areEqual) throw { message: 'Invalid password', status: 404 };

  let token = jwt.sign({ _id: user._id, username: user.username }, SECRET);

  return token;
};

module.exports = {
  register,
  login
};
