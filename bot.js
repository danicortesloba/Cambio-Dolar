require('dotenv').config();
const { getCurrentDolar } = require('./exchange');
const {get_dolar} = require('./commands');
const {subscribe} = require('./commands');
const {unsubscribe} = require('./commands');
const {subscription_status} = require('./commands');
const User = require("./db");
const TeleBot = require('telebot');
const telegram = new TeleBot(process.env.TOKEN);
const fetch = require('node-fetch');

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

function saveUser(message){
  let user = new User({id: message.from.id, is_bot: message.from.is_bot, first_name: message.from.first_name, language_code: message.from.language_code, subscription: true})
  user.save();
  telegram.sendMessage(message.chat.id, "You are subscribed!");
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
            saveUser(message);
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
      User.exists({ id: message.from.id }, function(err, result) {
     if (err) {
       return console.log("User doesn't exist");
     } else {
       User.findOne({id: message.from.id}, function (err, user) {
           if(err){
             return console.log(err);
           } else {
             giveSubscriptionStatus(user, message);
           }
       });
     }
   });

    }
});

module.exports = telegram;
