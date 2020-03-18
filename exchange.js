const fetch = require('node-fetch');

var pastDolar;
function getCurrency() {
  fetch('https://mindicador.cl/api')
  .then(response => response.json())
  .then(response => {

      var date = response.dolar.fecha;
    	var currentDolar = response.dolar.valor;
      if(currentDolar != pastDolar){
        console.log(currentDolar, date)
      } else {
        console.log('No change!')
      }
      pastDolar = currentDolar;
  })
  .catch(err => "ERROR");

}

setInterval(getCurrency, 600)
