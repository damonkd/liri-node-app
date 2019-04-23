require("dotenv").config();
var fs = require('fs');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");
var moment = require('moment');

var command = process.argv[2];
var nodeArgs = process.argv;
var value ="";

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      value = value + "+" + nodeArgs[i];
    }
    else {
      value += nodeArgs[i];
  
    }
  }
  


//var SpId = process.env.SPOTIFY_ID;
//var SpSecret = process.env.SPOTIFY_SECRET;

//var spotify = new Spotify(keys.spotify);
var spotify = new Spotify(keys.spotify);

if(command == "spotify-this-song"){
spotty(value)

//end spotify
}


function spotty(search){

    if(search == null){
        search = "The Sign";
    }

spotify.search({ type: 'track', query: search ,limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  //console.log(data.tracks.items[0]);
  console.log(data.tracks.items[0].artists[0].name); 
  console.log(data.tracks.items[0].name); 
  console.log(data.tracks.items[0].external_urls.spotify);
  console.log(data.tracks.items[0].album.name);
  });
}




if(command == "movie-this"){
 movie(value);

//end omdb
}

function movie(searcha){
axios.get("http://www.omdbapi.com/?t=" + searcha + "=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log( response.data.Title);
    console.log( response.data.Year);
    console.log( response.data.Ratings[0]);
    console.log( response.data.Ratings[1]);
    console.log( response.data.Country);
    console.log( response.data.Language);
    console.log( response.data.Plot);
    console.log( response.data.Actors);

  }
);

}


//var artist = "slayer"

if(command == "concert-this"){

band(value);
// end bands in town
}

function band(searchb){
axios.get("https://rest.bandsintown.com/artists/" + searchb + "/events?app_id=codingbootcamp").then(
  function(response) {
    console.log( response.data[0].venue.name);
    console.log( response.data[0].venue.city + ", " + response.data[0].venue.region);
    console.log(moment(response.data[0].datetime).format( 'MM-DD-YYYY'));
  }
);
}


if(command == "do-what-it-says"){

    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        //console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        var thisCommand = dataArr[0];
        var thisValue = dataArr[1];
        // We will then re-display the content as an array for later use.
        //console.log(thisCommand);
        //console.log(thisValue);
        
       if(thisCommand == "spotify-this-song"){
            spotty(thisValue);
           }
           
           if(thisCommand == "concert-this"){
            band(thisValue);
           }

           if(thisCommand == "movie-this"){
            movie(thisValue);
           }
           
      
      });
      
// end do what it says
}