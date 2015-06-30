var SoundCloud = {
 
  loadStreamUrl: function(viz, trackURL) {
    var clientID = "10ad4796eba0b699ba58581dcb84e252"
    SC.initialize({
      client_id: clientID
    });
    SC.get('/resolve', { url: trackURL }, function (track) {
      var songID = track.id;
      $.ajax({
        type: "GET",
        url: "http://api.sndcdn.com/i1/tracks/"+songID+"/streams?client_id="+clientID,
        dataType: 'json',
        success: function(trackLinks) {
          var streamURL = trackLinks.http_mp3_128_url;
          musicInterface.loadSong(streamURL);
          viz.path = streamURL;
          console.log(viz.path);
          console.log("AFter: ", viz);
          Visualization.updateOne(viz);
        }
      });
    });
  }
}