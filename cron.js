require('dotenv').config();
const { getCurrentDolar } = require('./exchange');
const User = require("./db");
const TeleBot = require('telebot');
const telegram = require('./bot');
const fetch = require('node-fetch');
const cron = require('node-cron');


var task = cron.schedule('00 10 * * *', () => {
  User.find({subscription: true}, function (err, subscribers) {
      if(err){
        return console.log(err);
      } else {
        subscribers.forEach(function (subscriber, index) {
          telegram.sendMessage(subscriber.id, `¡Buen día! El precio del dólar es: ${getCurrentDolar()}`);
        });
      }
  });
}, {
  scheduled: true,
  timezone: process.env.TIMEZONE
});

module.exports = task;
