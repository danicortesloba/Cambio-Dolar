const { token } = require('./config');
const { port } = require('./config');
const { timezone } = require('./config');
const { getCurrentDolar } = require('./exchange');
const {get_dolar} = require('./commands');
const {subscribe} = require('./commands');
const {unsubscribe} = require('./commands');
const {subscription_status} = require('./commands');
const User = require("./data/db/db");
const TeleBot = require('telebot');
const telegram = new TeleBot(token)
const fetch = require('node-fetch');
const cron = require('node-cron');
const express = require('express')
const app = express()



let subscribers;
let unsubscribers;



app.get('/', async function (req, res) {
let findSubscribers = await User.find({subscription: true}, function (err, people) {
    if(err){
      return console.log(err);
    } else {
      subscribers = people;
    }
  });
  let findUnsubscribers = await User.find({subscription: false}, function (err, people) {
      if(err){
        return console.log(err);
      } else {
        unsubscribers = people;
      }
    });
  res.json("Subscribers: " + subscribers + "\n" + "Unsubscribers: " + unsubscribers)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

cron.schedule('0 10 * * *', () => {
  User.find({subscription: true}, function (err, subscribers) {
      if(err){
        return console.log(err);
      } else {
        subscribers.forEach(function (subscriber, index) {
          telegram.sendMessage(subscriber.id, getCurrentDolar());
});
      }
  });

}, {
  scheduled: true,
  timezone: timezone
});

async function updateSubscriptionFalse(message){
  const filter = { id: message.from.id };
  const update = { subscription: false };
  let doc = await User.findOneAndUpdate(filter, update);
}

async function updateSubscriptionTrue(message){
  const filter = { id: message.from.id };
  const update = { subscription: true };
  let doc = await User.findOneAndUpdate(filter, update);
  telegram.sendMessage(message.chat.id, "You are subscribed!");
}

function giveSubscriptionStatus(user, message){
  if(user.subscription){
  telegram.sendMessage(message.chat.id, "You are subscribed");
  } else {
  telegram.sendMessage(message.chat.id, "You are not subscribed");
  }
}

telegram.on(get_dolar, (message) => {
    if (get_dolar) {
      const callback = (err, res) => console.log("Error: ", err, "Result: ", res)
      telegram.sendMessage(message.chat.id, getCurrentDolar());
    }
});

telegram.on(subscribe, (message) => {
    if (subscribe && message.chat.type == "private"){
      User.count({id: message.from.id}, function (err, count){
          if(count>0){
            updateSubscriptionTrue(message);
          } else {
            let user = new User({id: message.from.id, is_bot: message.from.is_bot, first_name: message.from.first_name, language_code: message.from.language_code, subscription: true})
            user.save();
            telegram.sendMessage(message.chat.id, "You are subscribed!");
          }
      });
    }
});

telegram.on(unsubscribe, (message) => {
    if (unsubscribe){
      updateSubscriptionFalse(message);
      telegram.sendMessage(message.chat.id, "You are unsubscribed!")
    }
});

telegram.on(subscription_status, (message) => {
    if (subscription_status){
      User.findOne({id: message.from.id}, function (err, user) {
          if(err){
            return console.log(err);
          } else {
            giveSubscriptionStatus(user, message);
          }
      });
    }
});

telegram.start();
