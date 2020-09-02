const { Storage } = require('@google-cloud/storage');

const bucketName = 'gs://chitra-bhandar';
const storage = new Storage({
  projectId: 'chitrashala',
});

const bucket = storage.bucket(bucketName);

function uploadImage(req, res, next) {
  if (!req.file) {
    return next();
  }
  const file = bucket.file(req.file.originalname);
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on('error', (err) => {
    next(err);
  });

  stream.on('finish', () => {
    console.log('Image uploaded successfully - ', req.file.originalname);
  });

  stream.end(req.file.buffer);
}

// multer
const Multer = require('multer');
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 40 * 1024 * 1024, // no larger than 40mb
  },
});

module.exports = {
  uploadImage,
  multer,
};
