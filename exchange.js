const fetch = require('node-fetch');
var currentDolar;
function getCurrency() {
  fetch('https://mindicador.cl/api')
  .then(response => response.json())
  .then(response => {
    	console.log(response.dolar.valor);
  })
  .catch(err => "ERROR");
}





getCurrency();
