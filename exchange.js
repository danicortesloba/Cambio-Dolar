const fetch = require('node-fetch');

var currentDolar;

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

setInterval(getCurrency, 60000)

module.exports = {
  currentDolar
};
