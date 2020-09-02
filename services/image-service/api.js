const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const getFilesFromBucket = require('./get-files-from-bucket');
const getFilesFromFirestore = require('./get-files-from-firestore');
const imageUploader = require('./upload-files');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/listImagesFromBuckets', async function (request, response) {
  const files = await getFilesFromBucket();
  console.log('files', files);
  response.send(files);
});

app.get('/listImagesFromFirestore', async function (request, response) {
  const files = await getFilesFromFirestore();
  console.log('firestore response is', files);
  response.send(files);
});

app.post(
  '/uploadImage',
  imageUploader.multer.single('image'),
  imageUploader.uploadImage,
  (req, res, next) => {
    if (req.file && req.file.gcsUrl) {
      return res.send(req.file.gcsUrl);
    }

    return res.status(500).send('Unable to upload');
  }
);

app.listen(8000);
