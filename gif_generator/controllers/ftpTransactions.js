var JSFtp = require("jsftp");
//ftp nfl_videos user:nfl_videos pass:ab6956
//ftp nfl_stills user:nfl_stills pass:ab6956

var ftp = new JSFtp({
host: "http://www.promofutbolera.mx",
port: 21, // defaults to 21
user: "nfl_videos", // defaults to "anonymous"
pass: "ab6956" // defaults to "@anonymous"
});

module.exports = {
  uploadToFtp : function( path, id, badge, callback ){
    var newFilename = id + '_' + badge + '.gif';
    ftp.put( path, newFilename, function(hadError) {
      if (!hadError){
        var url = "http://www.promofutbolera.mx/nfl_videos/" + newFilename;
        callback( url );
      }//if !hadError
      });
  }//uploadMedia
}//module.exports
