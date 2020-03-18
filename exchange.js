const fetch = require('node-fetch');
var currentDolar;
function getCurrency() {
  fetch('https://mindicador.cl/api')
  .then(response => response.json())
  .then(response => {
    parseResponse(response);
  })
  .catch(err => "ERROR");
}

function parseResponse(response){
  var parsed = JSON.parse(response);
  console.log(parsed.count);
}

//function getDivisaByCode(codigo, response) {
  //console.log(codigo, response);
//}


getCurrency();
