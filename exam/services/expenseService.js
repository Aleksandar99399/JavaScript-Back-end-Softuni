const Expense = require('../models/expenseModel');
const expenseController = require('../controllers/expenseController');
const AppError = require('../middlewares/appError');
const { Mongoose } = require('mongoose');

exports.getAll = async (userId) => {
  return await Expense.find({ creator: userId }).lean();
};

exports.createExpense = async (expenseData, userId, next) => {
  try {
    const expense = await Expense.create({ ...expenseData, creator: userId });

    console.log(expense);
    return expense;
  } catch (err) {
    next(new AppError(err.message, 404, 'create-expense'));
  }
};

exports.getOne = async (expenseId, next) => {
  try {
    const expense = await Expense.findById(expenseId).lean();

    return expense;
  } catch (err) {
    next(new AppError(err.message, 404, 'report'));
  }
};

exports.deleteExpense = async (expenseId, next) => {
  try {
    const exp = await Expense.deleteOne({ _id: expenseId });
    return exp;
  } catch (err) {
    next(new AppError(err.message, 404, 'report'));
  }
};

// exports.getSum = async (userId) => {
//   let exp = await Expense.find({ creator: userId });
//   let sum;

//   console.log(exp);
// };
exports.allSum = function () {
  const allExp = get();
};

exports.getSum = async (userId) => {
  const sum = await Expense.aggregate([
    {
      $match: { creator: { $elemMatch: { _id: userId } } }
    },
    {
      $group: {
        _id: '$creator',
        allSum: { $sum: '$total' }
      }
    }
  ]);

  console.log(sum);
  return sum;
};
