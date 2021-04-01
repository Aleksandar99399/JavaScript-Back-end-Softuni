const Expense = require('../models/expenseModel');
const User = require('../models/userModel');
const expenseController = require('../controllers/expenseController');
const AppError = require('../middlewares/appError');
const mongoose = require('mongoose');
const userModel = require('../models/userModel');

exports.getAll = async (userId) => {
  return await Expense.find({ creator: userId }).lean();
};

exports.createExpense = async (expenseData, userId, next) => {
  try {
    const expense = await Expense.create({ ...expenseData, creator: userId });
    // const saveModelUser = userModel.updateOne({ userId }, { expense });
    // console.log(saveModelUser);
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
      $match: { creator: new mongoose.Types.ObjectId(userId) }
    },
    {
      $group: {
        _id: '$creator',
        allSum: { $sum: '$total' }
      }
    }
  ]);

  return sum[0].allSum;
};
