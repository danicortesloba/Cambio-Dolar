require('dotenv').config();
const { conection_string } = require("../../config");
const mongoose = require('mongoose');
mongoose.connect(process.env.CONECTION_STRING, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

});

const userSchema = new mongoose.Schema({
  id: Number,
  is_bot: Boolean,
  first_name: String,
  language_code: String,
  subscription: Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
