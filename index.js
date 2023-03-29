const express = require('express'),
    bodyParser = require('body-parser'),
//    morgan = require('morgan'),
    uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

/* const express = require('express'),
    morgan = require('morgan');
//    fs = require('fs'),
//    path = require('path');
const app = express(); */
// create a write stream (in append mode)
// a 'log.txt file is created in root directory
//const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

//app.use(morgan('common'));
//app.use(morgan('combined', {stream: accessLogStream}));
//app.use(express.static('public'));

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//ID, name, array of FavoriteMovies
let users = [
    {
        id: 1,
        name: "John Doe",
        favoriteMovies: []
    },
    {
        id: 2,
        name: "Jane Doe",
        favoriteMovies: []
    }
];

// Title, Description, Genre object(Name, Description), Director obj (Name, Bio, birth(Year)), ImageURL, Featured
let movies = [
    {
        "Title": "John Wick: Chapter 4",
        "Description": "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
        "Genre": {
            "Name": "Action",
            "Description": "Lad crimp bilge Jolly Roger Spanish Main Cat o'nine tails Admiral of the Black long clothes walk the plank landlubber or just lubber. Topmast red ensign long clothes pirate spyglass crimp killick nipperkin barkadeer Buccaneer. To go on account brig Barbary Coast black spot reef sails topmast American Main stern sheet heave down."
        },
        "Director": {
            "Name": "Chad Stahelski",
            "Bio": "Chad Stahelski (born September 20, 1968) is an American stuntman and film director. He is known for directing the 2014 film John Wick and its three sequels. He has worked as a stuntman, stunt coordinator and second unit director on several films.",
            "Birth": 1968
        },
        "ImageURL": "https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_Ratio0.6716_AL_.jpg",
        "Featured": false
    },
    {
        "Title": "Everything Everywhere All at Once",
        "Description": "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.",
        "Genre": {
            "Name": "Comedy",
            "Description": "Hempen halter lugger strike colors red ensign gibbet Arr scurvy keel American Main bilge water. Grog lateen sail take a caulk skysail hail-shot nipper main sheet grog blossom coffer spyglass. Booty sutler fluke stern Cat o'nine tails bucko trysail pink run a rig long boat."
        },
        "Director": {
            "Name": "Daniel Kwan",
            "Bio": "Avast, me proud beauty! Wanna know why my Roger is so Jolly? What are YOU doing here? You can always trust the untrustworthy because you can always trust that they will be untrustworthy. Its the trustworthy you can’t trust. The rougher the seas, the smoother we sail. Ahoy! Even pirates, before they attack another ship, hoist a black flag. Shiver me timbers.",
            "Birth": 1988
        },
        "ImageURL": "https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_Ratio0.6716_AL_.jpg",
        "Featured": false
    },
    {
        "Title": "Scream VI",
        "Description": "In the next installment, the survivors of the Ghostface killings leave Woodsboro behind and start a fresh chapter in New York City.",
        "Genre": {
            "Name": "Horror",
            "Description": "Transom gibbet matey chase guns run a rig Jack Ketch interloper broadside man-of-war pink. Yo-ho-ho jolly boat jury mast smartly provost parley hands aye bucko bounty. Davy Jones' Locker jolly boat Blimey gally carouser draught lugsail hang the jib pinnace bilge rat."
        },
        "Director": {
            "Name": "Matt Bettinelli-Olpin",
            "Bio": "Matt Bettinelli-Olpin (born February 19, 1978) is an American director, writer, actor, and musician. He is a founding member of the punk band Link 80 and co-creator of the filmmaking collectives Chad, Matt & Rob and Radio Silence. He is best known for his work in horror films, including V/H/S, Southbound, Ready or Not and Scream",
            "Birth": 1978
        },
        "ImageURL": "https://m.media-amazon.com/images/M/MV5BODBjM2M4YTQtNmJlMS00MGU2LWI4ZGYtZTA1MzdmZDAyMjFkXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_Ratio0.6716_AL_.jpg",
        "Featured": false
    },
    {
        "Title": "The Whale",
        "Description": "The film stars Brendan Fraser, Sadie Sink, Hong Chau, Ty Simpkins, and Samantha Morton. The plot follows a reclusive, morbidly obese English teacher who tries to restore his relationship with his teenage daughter",
        "Genre": {
            "Name": "Drama",
            "Description": "Man-of-war walk the plank poop deck rutters fire ship broadside gaff red ensign log Cat o'nine tails. Boom brig Jolly Roger long clothes plunder overhaul salmagundi topmast prow wherry. Belaying pin Jack Ketch holystone scuttle heave to killick chandler topmast league long boat."
        },
        "Director": {
            "Name": "Darren Aronofsky",
            "Bio": "Darren Aronofsky is an American filmmaker. His films are noted for their surreal, melodramatic, and often disturbing elements, frequently in the form of psychological fiction. Aronofsky studied film and social anthropology at Harvard University before studying directing at the AFI Conservatory.",
            "Birth": 1969
        },
        "ImageURL": "https://m.media-amazon.com/images/M/MV5BZDQ4Njg4YTctNGZkYi00NWU1LWI4OTYtNmNjOWMyMjI1NWYzXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_Ratio0.7015_AL_.jpg",
        "Featured": false
    },
    {
        "Title": "Cocaine Bear",
        "Description": "An oddball group of cops, criminals, tourists and teens converge on a Georgia forest where a huge black bear goes on a murderous rampage after unintentionally ingesting cocaine.",
        "Genre": {
            "Name": "Thriller",
            "Description": "Ahoy boom bilge water cog Arr gaff crimp chandler dance the hempen jig line. Mizzenmast bowsprit gally lee Nelsons folly sloop fire in the hole run a shot across the bow spyglass coffer. Pirate Round landlubber or just lubber grog chandler case shot aft bring a spring upon her cable no prey, no pay hands long clothes."
        },
        "Director": {
            "Name": "Elizabeth Banks",
            "Bio": "Elizabeth Banks is an American actress and filmmaker. She is known for playing Effie Trinket in The Hunger Games film series and Gail Abernathy-McKadden in the Pitch Perfect film series.",
            "Birth": 1974
        },
        "ImageURL": "https://m.media-amazon.com/images/M/MV5BODAwZDQ5ZjEtZDI1My00MTFiLTg0ZjUtOGE2YTBkOTdjODFhXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_Ratio0.6716_AL_.jpg",
        "Featured": false
    },
];

// GET list of ALL movies
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

// GET movie details by Title
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.Title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('No such movie');
    }
});

// GET genre (description) by name
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('No such genre');
    }
});

// GET data about a director (bio, birth year, death year) by name
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find(movie => movie.Director.Name === directorName).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('No such director');
    }
});

// POST/Create New User
app.post('/users', (req, res) => {
    const newUser = req.body;
    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('Missing name in request body');
    }
});

// PUT/UPDATE User info (username)
// Need to add better code to update any updated info
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('No such user');
    }
});

// POST/Add movie to favorites - show added msg
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s favorites.`);
    } else {
        res.status(400).send('No such user');
    }
});

// DELETE/Remove a movie from favorites - show deleted msg
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle );
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s favorites.`);
    } else {
        res.status(400).send('No such user');
    }
});

// DELETE/Remove User - show deleted/removed msg
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter( user => user.id != id );
        res.status(200).send(`User ${id} has been removed.`);
    } else {
        res.status(400).send('No such user');
    }
});

// API documentation/how to
// app.get('/documentation.html', (req, res) => {
//     res.send('Top 10 Movies');
// });

// Listener
app.listen(8080, () => {
    console.log('App is listening on port 8080.');
});