/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(process.env.PORT || 8080, () => {
  console.log('listening on *:8080');
});
