const fetch = require('node-fetch');
var currentDolar;
var parsed;
function getCurrency() {
  fetch('https://mindicador.cl/api')
  .then(response => response.json())
  .then(response => {
    parseResponse(response);
  })
  .catch(err => "ERROR");
}

function parseResponse(response){
  parsed = JSON.parse(response);
  console.log(parsed);
}

//function getDivisaByCode(codigo, response) {
  //console.log(codigo, response);
//}


getCurrency();
