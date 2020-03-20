var request = require(./config.js);

var TelegramBot = require('node-telegram-bot-api'),
telegram = new TelegramBot(request.token, { polling: true });

const fetch = require('node-fetch');
var currentDolar;
var date;

telegram.on("text", (message) => {
  if(message.text.toLowerCase() == "dolar") {
  getCurrency();
  telegram.sendMessage(message.chat.id, currentDolar);
}else {telegram.sendMessage(message.chat.id, "Pídeme el dolar");}
});

  function getCurrency() {
    fetch('https://mindicador.cl/api')
    .then(response => response.json())
    .then(response => {
        date = response.dolar.fecha;
      	currentDolar = response.dolar.valor;
    })
    .catch(err => "ERROR");

  }

  getCurrency();
