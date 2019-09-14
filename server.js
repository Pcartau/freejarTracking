/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/* ---------------------------MIDDLEWARES---------------------------*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));


/* ---------------------------ROUTES---------------------------*/
// eslint-disable-next-line import/no-dynamic-require
require(`${process.env.PWD}/routes/routes.js`)(app);


app.listen(process.env.PORT || 8080, () => {
  console.log('listening on *:8080');
});
