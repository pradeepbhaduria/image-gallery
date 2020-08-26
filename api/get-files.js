const { Storage } = require('@google-cloud/storage');

// Creates a client
const bucketName = 'gs://chitrashala';
const storage = new Storage({
  projectId: 'poetic-sentinel-284612',
});

const getFiles = async () => {
  // Lists files in the bucket
  const [files] = await storage.bucket(bucketName).getFiles();
  return files.map(
    (file) => `https://storage.googleapis.com/chitrashala/${file.name}`
  );
};

module.exports = getFiles;
