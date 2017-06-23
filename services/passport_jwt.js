const passport = require('passport');
const User = require('../models/user');
const JWT_SECRET = require('../configuration');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


//Options for jwt_strategy note key in header for token is authorization
const JwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET.ID
};

//Passport_jwt strategy 1. create new strategy 2. supply options as above 3.find user by sub which is user.id 
const jwtLogin = new JwtStrategy(JwtOptions, (payload, done) => {

    User.findById(payload.sub, (err, user) => {
        if (err) {
            return next(err);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
});


//wire up strategy to passport middleware 
passport.use(jwtLogin);