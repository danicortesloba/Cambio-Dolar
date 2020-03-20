const { token } = require('./config');
const { getCurrentDolar } = require('./exchange');

const TeleBot = require('telebot');
const telegram = new TeleBot(token)

const fetch = require('node-fetch');

telegram.on("text", (message) => {
    if (message.text.toLowerCase() == "dolar") {
        telegram.sendMessage(message.chat.id, getCurrentDolar());
    } else {
        telegram.sendMessage(message.chat.id, "Pídeme el dolar");
    }
});

telegram.start();
