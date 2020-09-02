const { Storage } = require('@google-cloud/storage');

// Creates a client
const bucketName = 'gs://chitra-bhandar';
const storage = new Storage({
  projectId: 'chitrashala',
});

const bucket = storage.bucket(bucketName);

const getFilesFromBucket = async () => {
  // Lists files in the bucket
  const [files] = await bucket.getFiles();
  return files.map(
    (file) =>
      `https://storage.googleapis.com/chitra-bhandar-thumbnails/${file.name}`
  );
};

module.exports = getFilesFromBucket;
