const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.post('/register', (req, res) => {
  // Check if user exists

  let user = new User(req.body);

  user.save().then((createdUser) => {
    console.log(createdUser);
    res.status(201).json({ _id: createdUser._id });
  });
});

router.post('/login', async (req, res) => {
  User.findOne({
    username: req.body.login,
    password: req.body.password
  })
    .then((user) => {
      console.log(user);
      // Generate JWT
      let token = jwt.sign(
        {
          _id: user._id,
          username: user.username
        },
        'SOMESUPERSECRET',
        { expiresIn: '1h' }
      );

      res.status(200).json({
        _id: user._id,
        username: user.username,
        token
      });
    })
    .catch(() => {
      console.log('Stupid');
      return new Error('You are stupid');
    });
});

module.exports = router;
