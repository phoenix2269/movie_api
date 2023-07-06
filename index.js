const express = require('express'),
    bodyParser = require('body-parser'),
//    morgan = require('morgan'),
    uuid = require('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');
const { check, validationResult } = require('express-validator');
    
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    
const app = express();

app.use(bodyParser.json());

const cors = require('cors');
app.use(cors()); // Allows requests from ALL origins

// Specifies Allowed Origins
/* let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
})); */

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

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

app.get('/', (req, res) => {
    res.send('Welcome to MyFlix API');
})

// GET list of ALL movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
// app.get('/movies', (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// GET movie details by Title
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ Title: req.params.Title })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send('Error: ' + err);
        });
});

// GET genre (description) by name
app.get('/movies/genre/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ "Genre.Name": req.params.Name })
    .then((movie) => {
        res.status(201).json(movie.Genre);
    })
    .catch((err) => {
        console.error(err);
        res.status(400).send('Error: ' + err);
    });
});

// GET data about a director (bio, birth year, death year) by name
app.get('/movies/directors/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ "Director.Name": req.params.Name })
    .then((movie) => {
        res.status(201).json(movie.Director);
    })
    .catch((err) => {
        console.error(err);
        res.status(400).send('Error: ' + err);
    });
});

//  GET a list of ALL Users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Add a user
/* We'll expect JSON in this format
{
    ID: Integer,
    Username: String, (required)
    Password: String, (required)
    Email: String, (required)
    Birthday: Date
} */
app.post('/users', 
    // Validation logic for request
    [
        check('Username', 'Username is required').isLength({min: 5}),
        check('Username', 'Username contains non alphanumeric characters - not allowed').isAlphanumeric(),
        check('Password', 'Password is required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid').isEmail()
    ], (req, res) => {

    // Check the validation ibject for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: hashedPassword,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) => {res.status(201).json(user) })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send('Error: ' + err);
                })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// GET a user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOne({ Username: req.params.Username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Update a user's info, by username
/* We'll expect JSON in this format
{
    Username: String, (required)
    Password: String, (required)
    Email: String, (required)
    Birthday: Date
} */
app.put('/users/:Username',
    // Validation logic for request
    [
        check('Username', 'Username is required').isLength({min: 5}),
        check('Username', 'Username contains non alphanumeric characters - not allowed').isAlphanumeric(),
        check('Password', 'Password is required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid').isEmail()
    ],  passport.authenticate('jwt', { session: false }), (req, res) => {

        // Check the validation ibject for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
	
	if (User.password === req.body.Password) {
		let hashedPassword = req.body.Password;
	} else {
        let hashedPassword = Users.hashPassword(req.body.Password);
	}
    Users.findOneAndUpdate({ Username: req.params.Username }, {$set:
        {
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
    { new: true })  // This line makes sure that the updated document is returned
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// POST/Add movie to favorites - NOTE: DO NOT use ObjectID
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true })  // This line makes sure that the updated document is returned
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// DELETE/Remove a movie from favorites - show deleted msg
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true })  // This line makes sure that the updated document is returned
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});
// app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Users.findOneAndUpdate({ Username: req.params.Username }, {
        // $pu11: { FavoriteMovies: req.params.MovieID }
    // },
    // { new: true })  // This line makes sure that the updated document is returned
    // .then((updatedUser) => {
        // res.json(updatedUser);
    // })
    // .catch((err) => {
        // console.error(err);
        // res.status(400).send('Error: ' + err);
    // });
// });
// app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
	// Users.findOneAndUpdate(
		// { Username: req.params.Username },
		// {
			// $pull: { FavoriteMovies: req.params.MovieID },
		// },
		// { new: true }
	// )
		// .then((updatedUser) => {
			// if (!updatedUser) {
				// return res.status(404).send('Error: User not found');
			// } else {
			//	res.json(updatedUser);
			// }
		// })
		// .catch((error) => {
			// console.error(error);
			// res.status(500).send('Error: ' + error);
		// });
// });

// DELETE/Remove User by username
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
        if (!user) {
            res.status(400).send(req.params.Username + ' was not found');
        } else {
            res.status(200).send(req.params.Username + ' was deleted');
        }
    })
    .catch((err) => {
        console.err(err);
        res.status(500).send('Error: ' + err);
    });
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

// Listener
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on port ' + port);
});