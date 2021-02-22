const router = require('express').Router();
const expenseService = require('../services/expenseService');
const AppError = require('../middlewares/appError');
const Expense = require('../models/expenseModel');

router.get('/create', (req, res, next) => {
  res.render('create-expense');
});

router.post('/create', async (req, res, next) => {
  let { merchant, total, category, description, isReport } = req.body;

  let expenseData = {
    merchant,
    total,
    category,
    description,
    isReport: Boolean(isReport)
  };

  try {
    const expense = await expenseService.createExpense(
      expenseData,
      req.user._id,
      next
    );

    if (expense) {
      res.redirect('/');
    }
  } catch (err) {
    next(new AppError(err.message, 404, 'create-expense'));
  }
});

router.get('/:expenseId/details', async (req, res, next) => {
  try {
    const expense = await expenseService.getOne(req.params.expenseId);

    if (expense) {
      res.render('report', { expense });
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:expenseId/delete', async (req, res, next) => {
  try {
    const exp = await expenseService.deleteExpense(req.params.expenseId);

    if (exp.ok === 1) {
      res.redirect('/');
    }
  } catch (err) {
    next(new AppError(err.message, 404, 'report'));
  }
});

module.exports = router;
