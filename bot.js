const { token } = require('./config');
const { getCurrentDolar } = require('./exchange');

const TeleBot = require('telebot');
const telegram = new TeleBot(token)

const fetch = require('node-fetch');
const command = /\/get_dolar/;

telegram.on(command, (message) => {
    if (command) {
        telegram.sendMessage(message.chat.id, getCurrentDolar());
        console.log(message);
    } else {
        telegram.sendMessage(message.chat.id, "Pídeme el dolar");
    }
});

telegram.start();
