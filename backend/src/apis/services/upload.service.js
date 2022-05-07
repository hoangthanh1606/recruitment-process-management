const { Storage } = require('@google-cloud/storage')
const path = require('path')
const admin = require('firebase-admin')

const ok = require('../../configs/final.json')


admin.initializeApp({
  credential: admin.credential.cert(ok),
  storageBucket: process.env.BUCKET
})

const bucket = admin.storage().bucket()

const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject("No file");
      }
      let newFileName = `${file.originalname}_${Date.now()}`;

      let fileUpload = bucket.file(newFileName);

      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.on("error", (error) => {
        reject(error);
      });

      blobStream.on("finish", async () => {
        // const url = `https://storage.googleapis.com/b/${bucket.name}/o/${fileUpload.name}`;
        const url = await bucket.file(fileUpload.name).getSignedUrl({action: 'read' , expires: '03-09-2491'})
        resolve(url);
      });

      blobStream.end(file.buffer);
    });
  };

module.exports = {
    uploadFile,
}
