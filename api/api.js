const express = require('express');
const getFiles = require('./get-files');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/listObjects', async function (request, response) {
  const files = await getFiles();
  console.log('files', files);
  response.send(files);
});

app.listen(8000);
