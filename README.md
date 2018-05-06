# liri-node-app

# Introduction
LIRI is a command line node app that takes user input and outputs data based on a keyword.

# Setup
```
npm install twitter
npm install spotify
npm install request
npm install fs
```

# Examples
To retrieve Kanye's last 20 tweets:<br>
```
node liri.js my-tweets
```

To retrieve the Artist, Album, Title and Artist's Spotify Profile of a song:<br>
```
node liri.js spotify-this-song '<song name>'
```

To retrieve the Title, Release Year, IMDB Rating, Rotten Tomatoes Rating, Country, Language, Plot and Actors of a movie:<br>
```
node liri.js movie-this '<movie name>'
```

To retrive data based on the text of random.txt (feel free to edit the text based on the commands provided above):<br>
```
node liri.js do-what-it-says
```

# Notes
Open ```log.txt``` to view all data based on your searches