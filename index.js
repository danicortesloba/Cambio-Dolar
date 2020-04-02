require('dotenv').config()
const telegram = require('./bot');
const app = require('./api');
require('dotenv').config()


telegram.start();

app.use((req, res, next) => {
  next();
});
