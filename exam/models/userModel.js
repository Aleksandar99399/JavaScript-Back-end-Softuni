const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username must be provided'],
    minlength: 4,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password must be provided'],
    minlength: 4
  },
  amount: {
    type: Number,
    default: 0
  },
  expenses: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Expense'
    }
  ]
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.comparePasswords = async function (loginPassword) {
  return await bcrypt.compare(loginPassword, this.password);
};

// userSchema.virtual('expenseCount')

module.exports = mongoose.model('User', userSchema);
