require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');

// var bandsintown = require('bandsintown')(APP_ID);
 
// bandsintown
//   .getArtistEventList('Skrillex')
//   .then(function(events) {
//     // return array of events
//   });

// SPOTIFY
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
    console.log('artist: ' + songs[i].artists.map(getArtists));
    console.log('song name: ' + songs[i].name);
    console.log('preview song: ' + songs[i].preview_url);
    console.log('album: ' + songs[i].album.name);
    console.log('---------------------------------------------')
// getArtists();
// console.log(data.tracks.items[0]); 
}

// OMDB

// Then run a request with axios to the OMDB API with the movie specified
axios.get("http://www.omdbapi.com/?t=men+in+black&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  }
);

});

var pick = function(caseData, functionData) {
    switch(caseData){
        case 'show-me-some-tracks':
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
}