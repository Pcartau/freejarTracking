const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const User = require('./dbQueries/userQueries.js');

passport.use(new GithubStrategy({
  clientID: 'a56a7ffd8f18ca19c8df',
  clientSecret: '5ca72e9777e450f6af1c5cdeb853d8e2350f3859',
  callbackURL: 'http://localhost:8080/auth/github/callback',
}, (accessToken, refreshToken, profile, done) => {
  User.findOrCreate(profile.id, profile.displayName)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
}));

passport.serializeUser(({ userId }, done) => {
  done(null, userId);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    });
});
