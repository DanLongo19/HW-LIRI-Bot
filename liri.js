require("dotenv").config();
var keys = require("./keys.js");
var omdb = require('omdb');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
 
var spotify = new Spotify({
  id: "d989122c49344e57a3fdad9a93304348",
  secret: "c11132eb710d483991275be3928aa5cc"
});

const getArtists = function(artists){
    return artists.name;
}

const playSpotify = function(songName){

spotify.search({ type: 'track', query: songName }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
var songs = data.tracks.items;
for (var i=0; i < songs.length; i++){
    console.log(i);
    console.log('artist: ' + songs[i].artists);
    console.log('song name: ' + songs[i].name);
    console.log('preview song: ' + songs[i].preview_url);
    console.log('album: ' + songs[i].album.name);
    console.log('---------------------------------------------')

}

// console.log(data.tracks.items[0]); 
});
}
var pick = function(caseData, functionData) {
    switch(caseData){
        case 'spotify-this-song':
        playSpotify(functionData);
        break;
        default:
        console.log("LIRI doesn't follow")
    }
}
var runThis = function(argOne, argTwo){
    pick(argOne, argTwo);
};
runThis(process.argv[2], process.argv[3]);