const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Models = require('./models.js'),
    passportJWT = require('passport-jwt');

let Users = Models.User,
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;

/**
 * Passport function for User/password
 * @param - Username
 * @param - Password
 * @return - result of login attempt
 */
passport.use(new LocalStrategy({
    usernameField: 'Username',
    passwordField: 'Password'
}, (username, password, callback) => {
//    console.log(username + '  ' + password);
    Users.findOne({ Username: username})
        .then((user) => {
            if (user.validatePassword(password)) {  // No need to check for user since validatePassword will fail if the user doesn't exist
                console.log('finished');
                return callback(null, user);
            } else {
                console.log('Incorrect username');
                return callback(null, false, {message: 'Incorrect username or password.'});
            }
        })
        .catch((error) => {
            console.log(error);
            return callback(error); 
        });
}));

/**
 * Passport function for JWT
 * @param - jwt
 * @return - userID
 */
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'your_jwt_secret'
    }, (jwtPayload, callback) => {
        return Users.findById(jwtPayload._id)
            .then((user) => {
                return callback(null, user);
            })
            .catch((error) => {
                return callback(error);
            });
    }
));