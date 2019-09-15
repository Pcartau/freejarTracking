/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
const mongoPass = require(`${process.env.PWD}/src/mongoPass.js`);
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const app = express();


/* ---------------------------SESSIONS-AUTH-GITHUB------------------*/
require('./src/passport.js');

app.use(session({
  secret: 'C!4D##17$36@',
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
const password = process.env.MONGO_PASS || mongoPass;
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
require(`${process.env.PWD}/routes/routes.js`)(app);


app.listen(process.env.PORT || 8080, () => {
  console.log('listening on *:8080');
});
