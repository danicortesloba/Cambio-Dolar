require('dotenv').config()
const telegram = require('./bot');
const app = require('./api');
const task = require('./cron')
const mongoose = require('mongoose');

mongoose.connect(process.env.CONECTION_STRING, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});



telegram.start();

task.start();

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`))
