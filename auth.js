const jwtSecret = 'your_jwt_secret'; // this has to be the same key used in the JWTStrategy

const jwt = require('jsonwebtoken'),
    passport = require('passport');

/**
 * Your Local passport file
 */
require('./passport');

// const passport = require('passport');
// require('./passport');

/**
 * Generate JWT token
 * @param - user
 * @return - user, jwtSecret, {
 *		subject: user.Username,  // This is the username you're encoding in the JWT
 *		expiresIn: '7d',  // This epcifies that the token will expire in 7 days
 *		algorithm: 'HS256'  // This is the algorithm used to "sign" or encode the values of the JWT
 */
let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username,
        expiresIn: '7d',
        algorithm: 'HS256'
    });
}

/**
 * POST
 * @param - endpoint - /login
 * @return - user, token
 */
module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate('local', { session: false }, (error, user, info) => {
//            console.log(error, info);
//            console.log(user);
            if (error || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, { session: false }, (error) => {
                if (error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({ user, token });
            });
        })(req, res);
    });

    router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) =>{
        const response = {
            success: true,
        };
    
        return res.status(200).json(response);
    });
}