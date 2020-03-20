const { token } = require('./config');
const  currentDolar = require('./exchange');

const TeleBot = require('telebot');
 const telegram = new TeleBot(token)

const fetch = require('node-fetch');


telegram.on("text", (message) => {
  if(message.text.toLowerCase() == "dolar") {
  getCurrency();
  telegram.sendMessage(message.chat.id, currentDolar);
} else {telegram.sendMessage(message.chat.id, "Pídeme el dolar");}
});


  telegram.start();
