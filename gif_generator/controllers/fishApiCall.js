var request = require( "request" );



module.exports = {



post : function( latestId_reg, badge_id, filename, fileurl, md5Hash, callback ){

  var transaction_id = latestId_reg + "_" + badge_id;
  var media_id = latestId_reg + "_" + md5Hash;
  var productionBody = {
    "auth_id": "X79xx7qIRT97hBGACWGMx8cRz",
    "transaction_id": transaction_id,
    "media_list": [
      {
        "client_id": "2008",
        "guests": [
          {
            "guest_id_type": "badge_id",
            "guest_id_value": badge_id
          }
        ],
        "media_id": media_id,
        "media_type": "gif",
        "media_url": fileurl,
        "media_hash": md5Hash,
        "thumbnail_media_id": media_id,
        "thumbnail_media_type": "gif",
        "thumbnail_media_url": fileurl,
        "thumbnail_media_hash": md5Hash
      }
    ]
  };

  var testingBody = {
    "auth_id": "X79xx7qIRT97hBGACWGMx8cRz",
    "transaction_id": transaction_id,
    "media_list": [
      {
        "client_id": "2008",
        "guests": [
          {
            "guest_id_type": "badge_id",
            "guest_id_value": "9003037"
          }
        ],
        "media_id": media_id,
        "media_type": "gif",
        "media_url": fileurl,
        "media_hash": md5Hash,
        "thumbnail_media_id": media_id,
        "thumbnail_media_type": "gif",
        "thumbnail_media_url": fileurl,
        "thumbnail_media_hash": md5Hash
      }
    ]
  };
  request.post({
  headers: {'content-type' : 'application/json'},
  url:     'https://fishapi.fishsoftware.com/content/2016isgmx/upload/v3/prod',
  body:    JSON.stringify( testingBody )
}, function(error, response, body){
  var data = JSON.parse( body );
  if( data.status == "success" ){
    callback( "success" );
  }else{
    callback( "Hubo un error con el API Fish." );
  }
});
}



}//module.exports
