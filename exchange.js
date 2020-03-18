const fetch = require('node-fetch');
var currentDolar;
var pastDolar = 0;
function getCurrency() {
  fetch('https://mindicador.cl/api')
  .then(response => response.json())
  .then(response => {
      date = response.dolar.fecha
    	currentDolar = response.dolar.valor;
      if(currentDolar != pastDolar){
        console.log(currentDolar, date )
      }
      pastDolar = currentDolar;
  })
  .catch(err => "ERROR");
}





getCurrency();
