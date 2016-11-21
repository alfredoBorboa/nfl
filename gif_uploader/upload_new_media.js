var request = require( 'request' );
var JSFtp = require("jsftp");
//ftp nfl_videos user:nfl_videos pass:ab6956
//ftp nfl_stills user:nfl_stills pass:ab6956
var mysql = require("mysql");
//mysql
//host: http://www.promofutbolera.mx
//db: media_nfl;
//user: admin_nfl
//pass: ab6956
var md5File = require('md5-file');
var hound = require('hound');
var fs = require( "fs" );

var connection = mysql.createConnection({
  host     : 'http://www.promofutbolera.mx',
  user     : 'admin_nfl',
  password : 'ab6956',
  database : 'media_nfl'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

connection.query('CREATE TABLE IF NOT EXISTS gifs ( ' +
                'gif_id INT(11) NOT NULL AUTO_INCREMENT KEY, ' +
                'user_id INT(11) DEFAULT NULL, ' +
                'filename VARCHAR(255) DEFAULT NULL, ' +
                'url VARCHAR(255) DEFAULT NULL, ' +
                'md5_checksum VARCHAR(255), ' +
                'status INT(1), ' +
                'thumb_id INT(11), ' +
                'createdon TIMESTAMP)', function( err, result ){
                  if (err) throw err;

                  console.log( "table 'gifs' created successfully" );
                  connection.query( 'INSERT INTO gifs ( ' +
                                    ' user_id, filename, url, md5_checksum, status, thumb_id )' +
                                    ' VALUES ( "123", "fliname.jpg", ".com", "md5ggggog", "1", "123" )', function( err, result ){
                                      if (err) throw err;
                                      console.log( "test row inserted successfully" );
                                    });
                });

/*fs.open('log.txt' , 'a', function(){
  console.log( "done" );
});*/

var lastLine;

fs.exists( 'num_gifs.txt', function( exists ){
  if( exists ){
  console.log( "Archivo num_gifs.txt creado previamente. ¡Osea que tiene info guardada!" );
    fs.readFile('num_gifs.txt', 'utf-8', function(err, data) {
      if (err) throw err;
      var lines = data.trim().split('\n');
      lastLine = lines.slice(-1)[0];
      var thenum = parseInt( lastLine );
      var lineToAppend = thenum + 1 + "\n";
      fs.appendFile('num_gifs.txt', lineToAppend, (err) => {
        if (err) throw err;
        console.log('Número agregado');
      });
    });
}else{
  fs.open('num_gifs.txt' , 'a', function(){
    console.log( "Archivo num_gifs.txt creado por primera vez." );
    lastLine = 0;
    //console.log( lastLine );
    var lineToAppend = lastLine + 1 + "\n";
    fs.appendFile('num_gifs.txt', lineToAppend, (err) => {
      if (err) throw err;
      console.log('Número agregado');
    });
  }); //fs.open
}
});//fs.exists


var watcher = hound.watch('/Users/alfredo/Desktop/nfl/gifs');

watcher.on('create', function(file, stats) {
  console.log(file + ' was created')
});
watcher.on('change', function(file, stats) {
  console.log(file + ' was changed')
});
watcher.on('delete', function(file) {
  console.log(file + ' was deleted')
});
/*md5File('gifs/1_2.gif', (err, hash) => {
  if (err) throw err

  console.log(`The MD5 sum of LICENSE.md is: ${hash}`)
})

var ftp = new JSFtp({
  host: "promofutbolera.mx",
  port: 21, // defaults to 21
  user: "nfl_videos", // defaults to "anonymous"
  pass: "ab6956", // defaults to "@anonymous"
  debugMode: true
});

ftp.raw.mkd("/new_dirog", function(err, data) {
    if (err) return console.error(err);

    console.log(data.text); // Show the FTP response text to the user
    console.log(data.code); // Show the FTP response code to the user
});*/



var requestBody = {
  'auth_id': 'X79xx7qIRT97hBGACWGMx8cRz',
  'transaction_id': '1',
  'media_list': [
    {
      'client_id': 'vr_photo',
      'guests': [
        {
          'guest_id_type': 'badge_id',
          'guest_id_value': '6000002'
        },
        {
          'guest_id_type': 'badge_id',
          'guest_id_value': '5000023'
        }
      ],
      'media_id': '12345',
      'media_type': 'jpg',
      'media_url': 'https://somesite.com/photos/5000050_JKJK_1.jpg',
      'media_hash': 'b4b46688282042e2251f91db9bd240d5324534',
      'thumbnail_media_id': '54321',
      'thumbnail_media_type': 'jpg',
      'thumbnail_media_url': 'https://somesite.com/photos/5000050_JKJK_1_thumb.jpg',
      'thumbnail_media_hash': 'd07d89342f39ac3c0a00ceccc8a6cdad'
    },
    {
      'client_id': '2008',
      'guests': [
        {
          'guest_id_type': 'badge_id',
          'guest_id_value': '8745354'
        }
      ],
      'media_id': '45678',
      'media_type': 'jpg',
      'media_url': 'https://somesite.com/photos/5000871_82345.jpg',
      'media_hash': 'afre46688282042e2251f91db9bd240d5324534',
      'thumbnail_media_id': '87654',
      'thumbnail_media_type': 'jpg',
      'thumbnail_media_url': 'https://somesite.com/photos/5000871_82345_thumb.jpg',
      'thumbnail_media_hash': 'c9730097f0dc84ecd79ee5c89b126674'
    }
  ]
};

var testingBody = {
  "auth_id": "X79xx7qIRT97hBGACWGMx8cRz",
  "transaction_id": "1",
  "media_list": [
    {
      "client_id": "2008",
      "guests": [
        {
          "guest_id_type": "badge_id",
          "guest_id_value": "9003037"
        }
      ],
      "media_id": "2",
      "media_type": "gif",
      "media_url": "http://promofutbolera.mx/nfl_test/1.gif",
      "media_hash": "15216DC0391E020DD876BC3A47920550",
      "thumbnail_media_id": "2",
      "thumbnail_media_type": "png",
      "thumbnail_media_url": "http://promofutbolera.mx/nfl_test/1_thumb.png",
      "thumbnail_media_hash": "D77162E7B459D1B0CD3093D73C372990"
    }
  ]
};

/*
request({
    headers: {
      'Content-Type': 'application/json'
    },
    uri: 'https://fishapi.fishsoftware.com/content/2016isgmx/upload/v3/prod',
    body: JSON.stringify( requestBody ),
    method: 'POST'
  }, function (err, res, body) {
    //it works!
    console.log( JSON.stringify( err ), JSON.stringify( res ), JSON.stringify( body ) );
  });
  */
