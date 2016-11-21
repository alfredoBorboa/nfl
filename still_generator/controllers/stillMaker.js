var mv = require( "mv" );
var fs = require( "fs" );

module.exports = {
  convert : function( path, id, badge, callback ){

    var newPath = 'generated_stills/' + id + '_' + badge + '.jpg';
    mv( path, newPath, function(err){
    if (err) throw err;

    fs.unlink( path, function(){
      callback( newPath );
      //console.log( "Gif generado: " + id + '_' + badge + '.gif' );
    });

  });

}//convert
}
