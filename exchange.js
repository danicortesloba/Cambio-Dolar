const fetch = require('node-fetch');


function getCurrency() {
  fetch('https://mindicador.cl/api')
  .then(response => response.json())
  .then(response => {
      var pastDolar;
      var date = response.dolar.fecha;
    	var currentDolar = response.dolar.valor;
      if(currentDolar != pastDolar){
        console.log(currentDolar, date )
      }
      pastDolar = currentDolar;
  })
  .catch(err => "ERROR");

}

setInterval(getCurrency, 60000)
