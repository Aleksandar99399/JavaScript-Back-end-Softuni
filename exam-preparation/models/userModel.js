const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT, SALT_ROUNDS } = require('../config/config');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  }
  // passwordConfirm: {
  //   type: String,
  //   select: false,
  //   minlength: 5
  // }
});
userSchema.pre('save', function (next) {
  bcrypt
    .genSalt(SALT_ROUNDS)
    .then((salt) => bcrypt.hash(this.password, salt))
    .then((hash) => {
      this.password = hash;
      next();
    });
});

// userSchema.pre('save', function (next) {
//   if (this.password !== this.passwordConfirm) {
//     console.log('Passwords not match');
//     return;
//   }

//   next();
// });

// userSchema.methods.check = function () {
//   userSchema.pre('save', (next) => {
//     if (this.password || this.passwordConfirm) {
//       console.log('In Confirm');
//       throw new Error('Passwords not match');
//     }

//     next();
//   });
// };

module.exports = mongoose.model('User', userSchema);
