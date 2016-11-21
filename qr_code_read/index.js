var express = require( "express" );

var app = express();

app.get('/:code', function (req, res) {
  console.log( "Badge_id identificado: "+ req.params.code );
});

app.listen(3000, function () {
  console.log('Servidor corriendo en el puerto 3000!');
  startCycle();
})

var startCycle = function(){
  console.log( "Esperando captura de QR" );
}
