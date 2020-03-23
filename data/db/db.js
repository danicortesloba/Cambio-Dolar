var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

});

var userSchema = new mongoose.Schema({
  name: String,
  telephone: Number
});
var User = mongoose.model('User', userSchema);

var chano = new User({ name: 'Chano', telephone: 12345 });
console.log(chano.name);
