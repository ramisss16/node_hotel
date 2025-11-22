// set up password with local authentication strategy , using a person model for

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            console.log('Receive credentials', username, password);

            const user = await Person.findOne({ username });

            if (!user)
                return done(null, false, { message: 'Incorrect username' });

            // MUST USE await
            const isPasswordMatch = await user.comparePassword(password);

            if (isPasswordMatch)
                return done(null, user);

            return done(null, false, { message: 'Incorrect password' });
        } catch (error) {
            return done(error);
        }
    })
);

module.exports = passport;
