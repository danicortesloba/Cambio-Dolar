const { token } = require('./config');
const { getCurrentDolar } = require('./exchange');

const TeleBot = require('telebot');
const telegram = new TeleBot(token)

const fetch = require('node-fetch');
const get_dolar = /\/get_dolar/;
const subscribe = /\/subscribe/;
const unsubscribe = /\/unsubscribe/;
const subscription_status = /\/subscription_status/;

telegram.on(get_dolar, (message) => {
    if (get_dolar) {
        telegram.sendMessage(message.chat.id, getCurrentDolar());
    }
});

telegram.on(subscribe, (message) => {
    if (subscribe){
        telegram.sendMessage(message.chat.id, "You are subscribed!");
    }
});

telegram.on(unsubscribe, (message) => {
    if (unsubscribe){
        telegram.sendMessage(message.chat.id, "You are unsubscribed!");
    }
});

telegram.on(subscription_status, (message) => {
    if (subscription_status){
        telegram.sendMessage(message.chat.id, "You are checking your status!");
    }
});

telegram.start();
