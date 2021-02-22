const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  merchant: {
    type: String,
    required: [true, 'Merchant is required'],
    minlength: 4
  },
  total: {
    type: Number,
    required: [true, 'Total is required'],
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: 3,
    maxlength: 30
  },
  isReport: {
    type: Boolean,
    default: false
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Expense', expenseSchema);
