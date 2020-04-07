const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./index');
const models = require('../models');

const { User } = models;
const bcrypt = require('bcryptjs');

const cookieExtractor = (req, res) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['access_token'];
    }
    return token;
}

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: JWT_SECRET,
    passReqToCallback: true
}, async (req, payload, done) => {
    try {
        // Find the user by user's private id specified in token

        const user = await User.findById(payload.sub);

        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }

        // Otherwise, return the user
        req.user = user;
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

// LOCAL STRATEGY
//deal with username and password on local
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        User.findOne({ where: { email: email } })
            .then(function (user) {
                if (!user) {
                    return done(null, false);
                }
                // Check if the password is correct

                console.log(user)
                console.log("passport back end")

                const isMatch = bcrypt.compareSync(user.password, password)
                // If not, handle it
                console.log("isMatch: " + isMatch)
                console.log("user.password: " + user.password)
                console.log("password: " + password)
                if (!isMatch) {
                    return done(null, false);
                }
                // Otherwise, return the user
                done(null, user);
                
            })
    } catch (error) {
        done(error, false);
    }
}));