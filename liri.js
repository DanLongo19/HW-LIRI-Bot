
require("dotenv").config();
// NPM installs & API keys
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");

var fs = require("fs");
var query = process.argv[3];

var option = process.argv[2];

var spotify = new Spotify({
    id: "d989122c49344e57a3fdad9a93304348",
    secret: "c11132eb710d483991275be3928aa5cc"
  });
  
// switch function
var spotify = new Spotify(keys.spotify);
switch (option) {
    case "spotify-this-song":
        playSpotify(query);
        break;
    case "movie-this":
        movieThis(query);
        break;
    case "concert-this":
        concertThis(query);
        break;
    default:
        // Bonus 
        fs.readFile("log.txt", "utf8", function (error, data) {
            var data = data.split(",");
            var songInfo = data[1];
            if (error) {
                return console.log(error);
            }
            playSpotify(songInfo);
        })

}

// SPOTIFY
function playSpotify(songName) {
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("\nTrack Info" + "\nArtist: " + data.tracks.items[0].artists[0].name + "\nSong: " + data.tracks.items[0].name + "\nLink: " + data.tracks.items[0].external_urls.spotify + "\nAlbum: " + data.tracks.items[0].album.name + "\n" + "\n That's a jam!")
    });
}

// MOVIE
function movieThis(movieName) {
    if (!movieName) {
        movieName = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function (response) {
            if (!movieName) {
                movieName = "Mr. Nobody";
            }// console.log(response.data);
            console.log("\nMovie Info" + "\nTitle: " + response.data.Title + "\nRelease Year: " + response.data.Year + "\nRating: " + response.data.Rated + "\nRelease Country: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n" + "\n Great flick!");


        }
    );
}
// CONCERT-THIS
function concertThis(artist) {
    var bandsQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(bandsQueryUrl).then(
        function (response) {
            if (!concertThis){
                concertThis = "The Rolling Stones";
            }
            console.log("Upcoming Events");
            console.log("Artist: " + artist + "\nVenue: " + response.data[0].venue.name + "\nLocation: " + response.data[0].venue.country + "\nDate: " + moment(response.datetime).format("MM/DD/YYYY") + "\nRock on!");
        }
    )}



// SPOTIFY WAS WORKING BUT GIVING ME TOO MANY RESPONSES
// const playSpotify = function(songName){

// spotify.search({ type: 'track', query: songName }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
// var songs = data.tracks.items;
// for (var i=0; i < songs.length; i++){
//     console.log(i);
//     console.log('artist: ' + songs[i].artists.map(getArtists));
//     console.log('song name: ' + songs[i].name);
//     console.log('preview song: ' + songs[i].preview_url);
//     console.log('album: ' + songs[i].album.name);
//     console.log('---------------------------------------------')

// }

// // console.log(data.tracks.items[0]); 
// });
