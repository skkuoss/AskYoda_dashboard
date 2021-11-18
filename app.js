import fetch from "node-fetch";

const trackUrl1 =
    "https://open.spotify.com/track/3z8h0TU7ReDPLIbEnYhWZb?si=9dc41ae9a3b64e5d".replace(
        "open.spotify.com/track",
        "api.spotify.com/v1/tracks"
    );
const trackUrl2 =
    "https://open.spotify.com/track/2bgTY4UwhfBYhGT4HUYStN?si=ce3782c19e1040b8".replace(
        "open.spotify.com/track",
        "api.spotify.com/v1/tracks"
    );

const APIController = (function () {
    const clientId = "clientId";
    const clientSecret = "clientSecret";
    // List of the available genres for the recommendation endpoint
    const available_genres = [
        "acoustic",
        "afrobeat",
        "alt-rock",
        "alternative",
        "ambient",
        "anime",
        "black-metal",
        "bluegrass",
        "blues",
        "bossanova",
        "brazil",
        "breakbeat",
        "british",
        "cantopop",
        "chicago-house",
        "children",
        "chill",
        "classical",
        "club",
        "comedy",
        "country",
        "dance",
        "dancehall",
        "death-metal",
        "deep-house",
        "detroit-techno",
        "disco",
        "disney",
        "drum-and-bass",
        "dub",
        "dubstep",
        "edm",
        "electro",
        "electronic",
        "emo",
        "folk",
        "forro",
        "french",
        "funk",
        "garage",
        "german",
        "gospel",
        "goth",
        "grindcore",
        "groove",
        "grunge",
        "guitar",
        "happy",
        "hard-rock",
        "hardcore",
        "hardstyle",
        "heavy-metal",
        "hip-hop",
        "holidays",
        "honky-tonk",
        "house",
        "idm",
        "indian",
        "indie",
        "indie-pop",
        "industrial",
        "iranian",
        "j-dance",
        "j-idol",
        "j-pop",
        "j-rock",
        "jazz",
        "k-pop",
        "kids",
        "latin",
        "latino",
        "malay",
        "mandopop",
        "metal",
        "metal-misc",
        "metalcore",
        "minimal-techno",
        "movies",
        "mpb",
        "new-age",
        "new-release",
        "opera",
        "pagode",
        "party",
        "philippines-opm",
        "piano",
        "pop",
        "pop-film",
        "post-dubstep",
        "power-pop",
        "progressive-house",
        "psych-rock",
        "punk",
        "punk-rock",
        "r-n-b",
        "rainy-day",
        "reggae",
        "reggaeton",
        "road-trip",
        "rock",
        "rock-n-roll",
        "rockabilly",
        "romance",
        "sad",
        "salsa",
        "samba",
        "sertanejo",
        "show-tunes",
        "singer-songwriter",
        "ska",
        "sleep",
        "songwriter",
        "soul",
        "soundtracks",
        "spanish",
        "study",
        "summer",
        "swedish",
        "synth-pop",
        "tango",
        "techno",
        "trance",
        "trip-hop",
        "turkish",
        "work-out",
        "world-music",
    ];

    // private methods
    const _getToken = async () => {
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                    "Basic " +
                    Buffer.from(clientId + ":" + clientSecret).toString(
                        "base64"
                    ),
            },
            body: "grant_type=client_credentials",
        });

        const data = await result.json();
        return data.access_token;
    };

    const _getArtist = async (token, artistEndPoint) => {
        const result = await fetch(`${artistEndPoint}`, {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        });

        const data = await result.json();
        return data;
    };

    const _getGenres = async (token) => {
        const result = await fetch(
            `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
            {
                method: "GET",
                headers: { Authorization: "Bearer " + token },
            }
        );

        const data = await result.json();
        return data.categories.items;
    };

    const _getPlaylistByGenre = async (token, genreId) => {
        const limit = 10;

        const result = await fetch(
            `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
            {
                method: "GET",
                headers: { Authorization: "Bearer " + token },
            }
        );

        const data = await result.json();
        return data.playlists.items;
    };

    const _getTracks = async (token, tracksEndPoint) => {
        const limit = 10;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        });

        const data = await result.json();
        return data.items;
    };

    const _getTrack = async (token, trackEndPoint) => {
        const result = await fetch(`${trackEndPoint}`, {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        });

        const data = await result.json();
        return data;
    };

    const _getRecommendations = async (token, artists, genres, tracks) => {
        const endpoint_url = "https://api.spotify.com/v1/recommendations?";
        artists = artists.join(",");
        genres = genres.filter((genre) => available_genres.includes(genre))[0];
        tracks = tracks.join(",");
        const limit = 10;

        const result = await fetch(
            `${endpoint_url}limit=${limit}&seed_genres=${genres}&seed_artists=${artists}&seed_tracks=${tracks}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );

        const data = await result.json();
        return data.tracks;
    };

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylistByGenre(token, genreId) {
            return _getPlaylistByGenre(token, genreId);
        },
        getTracks(token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint);
        },
        getTrack(token, trackEndPoint) {
            return _getTrack(token, trackEndPoint);
        },
        getArtist(token, artistEndPoint) {
            return _getTrack(token, artistEndPoint);
        },
        getRecommendations(token, artists, genres, tracks) {
            return _getRecommendations(token, artists, genres, tracks);
        },
    };
})();

//Get an access token
const token = await APIController.getToken();

//Track ID, Artist ID and Genres for Track1
const track1 = await APIController.getTrack(token, trackUrl1);
const track1_id = track1.id;
const track1_artist = track1.artists[0].id;
const track1_genres = (
    await APIController.getArtist(
        token,
        "https://api.spotify.com/v1/artists/" + track1_artist
    )
).genres;

//Track ID, Artist ID and Genres for Track2
const track2 = await APIController.getTrack(token, trackUrl2);
const track2_id = track2.id;
const track2_artist = track2.artists[0].id;
const track2_genres = (
    await APIController.getArtist(
        token,
        "https://api.spotify.com/v1/artists/" + track2_artist
    )
).genres;

//Create arrays as seeds for the getRecommendations method
const seedArtists = [track1_artist, track2_artist];
const seedGenres = track1_genres.concat(track2_genres);
const seedTracks = [track1_id, track2_id];

// Get recommendations based on seed arrays
const recommendations = await APIController.getRecommendations(
    token,
    seedArtists,
    seedGenres,
    seedTracks
);
console.log(
    `If you like "${track1.name} - ${track1.artists[0].name}" and "${track2.name} - ${track2.artists[0].name}", you should listen to: \n`
);
// Print each track name and artist of recommendations array
recommendations.forEach((song) =>
    console.log(
        `${song.name} - ${
            song.artists[0].name
        } (${song.album.release_date.substring(0, 4)})`
    )
);
