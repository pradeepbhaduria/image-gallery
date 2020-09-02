const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: 'chitrashala',
});

const imageCollection = firestore.collection('images');

const getFilesFromFirestore = async () => {
  const snapshot = await imageCollection.get();
  const response = [];
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
    const docData = doc.data();
    if (docData.thumbnail)
      response.push({
        key: doc.id,
        imageUrl: `https://storage.googleapis.com/chitra-bhandar/${doc.id}`,
        imageThumbnailUrl: `https://storage.googleapis.com/chitra-bhandar-thumbnails/${doc.id}`,
        ...docData,
      });
  });

  return response;
};

module.exports = getFilesFromFirestore;
