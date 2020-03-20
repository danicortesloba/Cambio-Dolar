const fetch = require('node-fetch');

let currentDolar = 0;

function getCurrency() {
    fetch('https://mindicador.cl/api')
    .then(response => response.json())
    .then(response => {
        date = response.dolar.fecha;
        currentDolar = response.dolar.valor;
    })
    .catch(console.error);
}

getCurrency();

setInterval(getCurrency, 60000)

module.exports = {
    getCurrentDolar: () => currentDolar,
};
