const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

});

const userSchema = new mongoose.Schema({
  id: Number,
  is_bot: Boolean,
  first_name: String,
  language_code: String
});

const User = mongoose.model('User', userSchema);

const chano = new User({ id:1234, is_bot: false, first_name: 'Chano', language_code: 'es'});
console.log(chano.is_bot);
