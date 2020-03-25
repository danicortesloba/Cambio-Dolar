const { token } = require('./config');
const { getCurrentDolar } = require('./exchange');
const User = require("./data/db/db");


const TeleBot = require('telebot');
const telegram = new TeleBot(token)

const fetch = require('node-fetch');
const get_dolar = /\/get_dolar/;
const subscribe = /\/subscribe/;
const unsubscribe = /\/unsubscribe/;
const subscription_status = /\/subscription_status/;


async function updateSubscription(message){
  const filter = { id: message.from.id };
  const update = { subscription: false };
  let doc = await User.findOneAndUpdate(filter, update);
}

telegram.on(get_dolar, (message) => {
    if (get_dolar) {
        telegram.sendMessage(message.chat.id, getCurrentDolar());
    }
});

telegram.on(subscribe, (message) => {
    if (subscribe){
      let testUser = new User({id: message.from.id, is_bot: message.from.is_bot, first_name: message.from.first_name, language_code: message.from.language_code, subscription: true})
      testUser.save();
      telegram.sendMessage(message.chat.id, "You are subscribed!");
    }
});


telegram.on(unsubscribe, (message) => {
    if (unsubscribe){
      updateSubscription(message);
      telegram.sendMessage(message.chat.id, "You are unsubscribed!")    }
});

telegram.on(subscription_status, (message) => {
    if (subscription_status){
      const callback = (err, res) => console.log("Error: ", err, "Result: ", res)
      const user = User.find({ id: message.from.id }, callback);
      if(user.subscription == true){
        telegram.sendMessage(message.chat.id, "You are subscribed");
      } else {
        telegram.sendMessage(message.chat.id, "You are not subscribed");
      }
    }
});

telegram.start();
