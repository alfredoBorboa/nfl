var hound = require( "hound" );
var mv = require( "mv" );
var fs = require( "fs" );
var gify = require( "gify" );
var express = require( "express" );
var path = require('path');

var dbqueries = require( "./controllers/mysqlQueries.js" );
var filewatcher = require( "./controllers/directoryWatchers.js" );
var stillmaker = require( "./controllers/stillMaker.js" );
var uploader = require( "./controllers/ftpTransactions.js" );
var md5 = require( "./controllers/md5Calculations.js" );
var fishApi = require( "./controllers/fishApiCall.js" );

var app = express();
app.use(express.static('qr_code_reader'))

var latestId_reg;

//Crea la tabla gifs en BD en caso de que no esté creada.
function init(){
  console.log( "/////////////////////////////////////////" );
  console.log( "//// NFL Mobile Pass Still Generator ////" );
  console.log( "/////////////////////////////////////////" );
dbqueries.createTable();
dbqueries.getLatest( function( latestId) {
  console.log( "Último registro capturado: " + latestId );
  latestId_reg = latestId;
  console.log( "Esperando QR o código..." );
});//dbqueries.getLatest
}//init
init();

app.get('/scanner', function(req, res) {
    res.sendFile(path.join(__dirname + '/qr_code_reader/index.html'));
});

//Recibe GET rqeust del lector QR
app.get('/code/:code', function (req, res) {
  console.log( "Badge_id ingresado: "+ req.params.code );
  var badge_id = req.params.code
  if( latestId_reg != undefined ){
    filewatcher.startWatching( function( path ){
      stillmaker.convert( path, latestId_reg + 1, badge_id, function( newPath ){
          console.log( 'Still creado: ' + newPath );
          md5.obtain( newPath, function( hash ){
            var md5Hash = hash;
            console.log( 'Subiendo still a FTP...' );
            uploader.uploadToFtp( newPath, latestId_reg + 1, badge_id, function( url ){
                console.log( "Still guardado en: " + url );
                var filename = latestId_reg + '_' + badge_id;
                var fileurl = url;
                dbqueries.register( badge_id, filename, fileurl, md5Hash, function( response ){
                  if( response == "success" ){
                    console.log( "Registro hecho en BDD." );
                    fishApi.post( latestId_reg, badge_id, filename, fileurl, md5Hash, function( response ){
                      if( response == "success" ){
                        console.log( "Still registrado en Fish API." );
                        init();
                      }else{
                        console.log( response );
                      }
                    });
                  }else{
                    console.log( "Hubo un error." );
                  }
                });//dbqueries.register
            });//uploadToFtp
          });//md5.obtain
      });//gifmaker.convert
    });//filewatcher.startWatching
    res.send( "Esperando captura de video..." );
  }else{
    console.log( "Sin último ID de still. Posible falla de conexión." );
    res.send( "Sin último ID de still. Posible falla de conexión." );
  }
});

app.listen(3000, function () {
  console.log('Servidor corriendo en el puerto 3000!');
});
