require("dotenv").config();

var keys = require('./keys');
var request = require('request');
var fs = require('fs');

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

if (command === 'my-tweets') {
    tweets();

} else if (command === 'spotify-this-song') {
    songName = (process.argv).slice(3);
    spotifyThis(songName);

} else if (command === 'movie-this') {
    movieName = (process.argv).slice(3);

    if (!process.argv[3]) {
        movieName = 'Mr. Nobody';
    }

    movieThis(movieName);

} else if (command === 'do-what-it-says') {
    doIt();

};

// ========================= GET DATA FROM API ========================= //

// =========== RUN TWITTER ============ //
function tweets() {

    var path = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=kanyewest&count=20';
    var params = { count: 20};

    client.get(path, params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 20; i++) {
                console.log(tweets[i].text);

                myTweets = tweets[i].text;

                logTweets(myTweets);
            };
        };
    });
};

// =========== RUN SPOTIFY ============ //
function spotifyThis(songName) {

    var params = {
        type: 'track', 
        query: songName 
    };

    spotify.search(params, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        };
       
        console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
        console.log('Album: ' + data.tracks.items[0].album.name);
        console.log('Song Name: ' + data.tracks.items[0].name);
        console.log('Artist Profile: ' + data.tracks.items[0].album.artists[0].external_urls.spotify);

        var songData = {
            'Artist': data.tracks.items[0].album.artists[0].name,
            'Album': data.tracks.items[0].album.name,
            'Song Name': data.tracks.items[0].name,
            'Artist Profile': data.tracks.items[0].album.artists[0].external_urls.spotify
        };

        logSpotify(songData);

      });

};



// =========== RUN OMDB ============ //
function movieThis(movieName) {

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('Title: ' + JSON.parse(body).Title);
            console.log('Release Year: ' + JSON.parse(body).Year);
            console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
            console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
            console.log('Was produced in: ' + JSON.parse(body).Country);
            console.log('Language: ' + JSON.parse(body).Language);
            console.log('Plot: ' + JSON.parse(body).Plot);
            console.log('Actors: ' + JSON.parse(body).Actors);
        };

        var movieData = {
            "Title": JSON.parse(body).Title,
            "Release Year": JSON.parse(body).Year,
            "IMDB Rating": JSON.parse(body).imdbRating,
            "Rotten Tomatoes Rating": JSON.parse(body).Ratings[1].Value,
            "Was produced in": JSON.parse(body).Country,
            "Language": JSON.parse(body).Language,
            "Plot": JSON.parse(body).Plot,
            "Actors": JSON.parse(body).Actors
        };

        logOMDB(movieData);

    });

};

// =========== RUN RANDOM.TXT ============ //
function doIt() {

    fs.readFile('random.txt', 'utf-8', function(error, data) {

        if (error) {
            return console.log(error);
        };

        // console.log(data);
        var doText = data.split(',');
        // console.log(doText);

        if (doText[0] == 'spotify-this-song') {
            spotifyThis(doText[1]);
        } else if (doText[0] == 'movie-this') {
            movieThis(doText[1]);
        }

    });
};



// ========================= *BONUS* LOG DATA TO LOG.TXT ========================= //


// =========== LOG TWEETS ============ //
function logTweets(myTweets) {
    fs.appendFile('log.txt', '\n' + myTweets + '\n', function(err) {
        if (err) {
            return console.log(err);
        }
    })
};

// =========== LOG SPOTIFY ============ //
function logSpotify(songData) {
    var spotifyData = JSON.stringify(songData, null, 2);
    fs.appendFile('log.txt', '\n' + 'SONG' + '\n' + spotifyData + '\n=========================================================================', function(err) {
        if (err) {
            return console.log(err);
        }
    })
}


// =========== LOG OMDB ============ //
function logOMDB(movieData) {
    var omdbData = JSON.stringify(movieData, null, 2);

    fs.appendFile('log.txt', '\n' + 'MOVIE' + '\n' + omdbData + '\n=========================================================================', function(err) {
        if (err) {
            return console.log(err);
        };
    });
};