const express = require('express');
const app = express();
require('dotenv').config() 
app.use(express.static('public')) 
const PORT = process.env.PORT || 5556;

app.use(express.static('public'))
app.set('view engine', 'ejs')

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
})
// console.log(process.env.CLIENT_ID)

spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));

app.get('/', (req, res) => {
    res.render('index', { title: "My atristName" })
})

app.get(`/artist-search`, (req, res) => {
    spotifyApi
        .searchArtists(req.query.atristName)
        .then((data) => {
            //  console.log( data.body.items);
            //  console.log(data.body.artists.items);
            res.render(`artist-search-results`, { artistData: data.body.artists.items, title: "My atristName" })
        })
        .catch((err) =>
            console.log(`The error while searching artists occurred: `, err)
        );
});

app.get('/albums/:id', (req, res, next) => {
    spotifyApi
    .getArtistAlbums(req.params.id)
        .then((data2) => {
            //  console.log( data.body.items);
            //  console.log(data.body.artists.items);
            res.render(`albums`, { artistData2: data2.body.items, title: "Albums" })
        })
        .catch((err) =>
            console.log(`The error while searching artists occurred: `, err)
        );
});

app.get('/tracks/:id', (req, res, next) => {
    spotifyApi
    .getAlbumTracks(req.params.id)
        .then((data3) => {
            //  console.log( data.body.items);
            //  console.log(data.body.artists.items);
            res.render(`tracks`, { artistData3: data3.body.items, title: "Tracks" })
        })
        .catch((err) =>
            console.log(`The error while searching artists occurred: `, err)
        );
});
  
    



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));