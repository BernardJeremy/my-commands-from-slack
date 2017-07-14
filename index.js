const express = require('express');
const glob = require('glob');
const path = require('path');
const bodyParser = require('body-parser');


const port = require('./config.json').port;

const app = express();
const targetPath = path.join(`${__dirname}/modules/*/controller.js`);

app.use(bodyParser.json());

glob(targetPath, {}, (err, files) => {
  if (err !== null) {
    console.error('Error getting files in ', targetPath, ' : ', err);
  }

  files.forEach((file) => {
    require(file)(app);
  });
});

app.listen(port, function () {
  console.log('App listening on port ' + port);
});
