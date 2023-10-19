const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * MovieSchema model
 *
 * Title, Description
 * Genre - Name, Description
 * Director - Name, Bio
 * ImagePath, Featured, ReleaseYear, RottenTomatoes
 */
let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
            Name: String,
            Description: String
    },
    Director: {
        Name: String,
        Bio: String
    },
    ImagePath: String,
    Featured: Boolean,
    ReleaseYear: String,
    RottenTomatoes: String
});

/**
 * UserSchema model
 *
 * Username, Password, Email, Birthday, FavoriteMovies(Array)
 */
let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

/**
 * Hashs the password before storing in the DB
 */
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

/**
 * Hashs the entered password then compares it the stored password
 */
userSchema.methods.validatePassword = function(password) {
	if (!bcrypt.compare(password, this.Password)) {
		return bcrypt.compareSync(password, this.Password);
	} else {
		return password;
	}
};

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;