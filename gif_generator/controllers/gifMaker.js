var mv = require( "mv" );
var fs = require( "fs" );
var gify = require( "gify" );
var gm = require('gm');

module.exports = {
  convert : function( path, id, badge, callback ){

    var encodingOpts = {
      rate: 3,
      delay: 20,
      width: 700
    }

    var newPath = 'generated_gifs/' + id + '_' + badge + '.gif';
    gify( path, newPath, encodingOpts, function(err){
    if (err) throw err;

    fs.unlink( path, function(){
      callback( newPath );
      //console.log( "Gif generado: " + id + '_' + badge + '.gif' );
    });

  });

}//convert
}
