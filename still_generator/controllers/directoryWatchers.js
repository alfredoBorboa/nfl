var hound = require( "hound" );
var mv = require( "mv" );

var watcher;
var pathToWatch = '../../../Pictures';

module.exports = {

  startWatching: function( callback ){
    // Observa cambios en el directorio Movies
    watcher = hound.watch( pathToWatch );
    console.log( "Esperando captura de still..." );
    //observa cuando se crea un nuevo archivo en Movies y extrae el nombre del file. El nombre del file deberá ser el badge_id del usuario
    watcher.on('create', function(file, stats) {
      /*var filename = file.split( "/" );
      filename = filename[ filename.length - 1 ];
      var badge_id = filename.split( "." );
      badge_id = badge_id[ 0 ];*/
      console.log('Still creado: ' + file);
      callback( file );
      //console.log('badge_id: ' + badge_id );
      //generateGif( file, badge_id );
    });// watcher on create
  }

};//module.exports
