const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  id: Number,
  is_bot: Boolean,
  first_name: String,
  language_code: String,
  subscription: Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
