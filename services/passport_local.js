const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local');


const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }

        user.comparePassword(password, (err, isMatch) => {
            if (err) { return done(err) }
            if (!isMatch) { return done(null, false); }
            return done(null, user);
        })
    });
});

passport.use(localLogin);