/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
const mongoPass = require(`${process.env.PWD}/src/mongoPass.js`);
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


/* ---------------------------DATABASE------------------------------*/
const password = process.env.MONGO_PASS || mongoPass;
const uri = `mongodb+srv://admin:${password}@cluster0-s0dow.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


/* ---------------------------MIDDLEWARES---------------------------*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));


/* ---------------------------ROUTES--------------------------------*/
require(`${process.env.PWD}/routes/routes.js`)(app);


app.listen(process.env.PORT || 8080, () => {
  console.log('listening on *:8080');
});
