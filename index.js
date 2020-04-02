const telegram = require('./bot');
const app = require('./api');

telegram.start();

app.use((req, res, next) => {
  next();
});
