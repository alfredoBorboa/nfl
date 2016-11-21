var md5File = require('md5-file');

module.exports = {

  obtain : function( url, callback ){
    md5File( url, function( err, hash ){
      if (err) throw err;

      callback( hash );
    });
  }

}//module.exports
