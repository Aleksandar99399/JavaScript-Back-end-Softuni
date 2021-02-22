const router = require('express').Router();
const expenseService = require('../services/expenseService');

router.get('/', async (req, res) => {
  if (req.user) {
    let expenses = await expenseService.getAll(req.user._id);

    res.render('home', { expenses });
  } else {
    res.render('guest-home');
  }
});

module.exports = router;
