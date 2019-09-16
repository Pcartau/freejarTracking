const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const User = require('./dbQueries/userQueries.js');
const keys = require('./keys.js');

passport.use(new GithubStrategy({
  clientID: 'a56a7ffd8f18ca19c8df',
  clientSecret: process.env.GIT_SECRET || keys.githubSecret,
  callbackURL: 'http://localhost:8080/auth/github/callback',
}, (accessToken, refreshToken, profile, done) => {
  User.findOrCreate(profile.id, profile.displayName || profile.username)
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
