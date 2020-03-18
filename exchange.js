const fetch = require('node-fetch');

var pastDolar;
function getCurrency() {
  fetch('https://mindicador.cl/api')
  .then(response => response.json())
  .then(response => {

      const date = response.dolar.fecha;
    	const currentDolar = response.dolar.valor;
      if(currentDolar != pastDolar){
        console.log(currentDolar, date)
        pastDolar = currentDolar;
      }else {
        console.log('nochange')
      }

  })
  .catch(err => "ERROR");

}

setInterval(getCurrency, 60000)
