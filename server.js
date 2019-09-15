/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const keys = require('./src/keys.js');

const app = express();


/* ---------------------------SESSIONS-AUTH-GITHUB------------------*/
require('./src/passport.js');

app.use(session({
  secret: process.env.SESSION_SECRET || keys.secretSession,
  name: 'sessionId',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  }));


/* ---------------------------DATABASE------------------------------*/
const password = process.env.MONGO_PASS || keys.mongoPass;
const uri = `mongodb+srv://admin:${password}@cluster0-s0dow.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});


/* ---------------------------MIDDLEWARES---------------------------*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.disable('x-powered-by');


/* ---------------------------ROUTES--------------------------------*/
require('./routes/routes.js')(app);


app.listen(process.env.PORT || 8080, () => {
  console.log('listening on *:8080');
});
