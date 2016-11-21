var mysql = require( "mysql" );

var connection = mysql.createConnection({
  host     : 'http://www.promofutbolera.mx',
  user     : 'admin_nfl',
  password : 'ab6956',
  database : 'media_nfl'
});

/*connection.query( 'INSERT INTO gifs ( ' +
                  ' user_id, filename, url, md5_checksum, status, thumb_id )' +
                  ' VALUES ( "123", "fliname.jpg", ".com", "md5ggggog", "1", "123" )', function( err, result ){
                    if (err) throw err;
                    console.log( "test row inserted successfully" );
                  });*/

module.exports = {

  createTable : function(){

    connection.query('CREATE TABLE IF NOT EXISTS gifs ( ' +
                    'gif_id INT(11) NOT NULL AUTO_INCREMENT KEY, ' +
                    'user_id INT(11) DEFAULT NULL, ' +
                    'filename VARCHAR(255) DEFAULT NULL, ' +
                    'url VARCHAR(255) DEFAULT NULL, ' +
                    'md5_checksum VARCHAR(255) DEFAULT NULL, ' +
                    'createdon TIMESTAMP)', function( err, result ){
                      if (err) throw err;

                      console.log( "Tabla 'gifs' ha sido creada." );

                    });
  },

  getLatest : function( callback ){

    connection.query( 'SELECT gif_id FROM gifs ORDER BY gif_id DESC LIMIT 1', function( err, result ){
      if( err ) throw err;
      if( result[ 0 ] ){
        callback (result[ 0 ].gif_id );
      }else{
        callback( 0 );
      }

    });
  },

  register : function( badge_id, filename, fileurl, md5Hash, callback ){
    connection.query( 'INSERT INTO gifs ( ' +
                      ' user_id, filename, url, md5_checksum )' +
                      ' VALUES ( "' + badge_id + '", "' + filename + '", "' + fileurl + '", "' + md5Hash + '" )', function( err, result ){
                        if (err) throw err;
                        callback( "success" );
                      });
  }//register

};//module.exports



/*connection.query( 'INSERT INTO gifs ( ' +
                  ' user_id, filename, url, md5_checksum )' +
                  ' VALUES ( "123", "fliname.jpg", ".com", "md5ggggog", "1", "123" )', function( err, result ){
                    if (err) throw err;
                    console.log( "test row inserted successfully" );*/
