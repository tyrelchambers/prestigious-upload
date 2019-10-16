import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import multer from 'multer';
require('dotenv').config();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucket: process.env.AWS_BUCKET
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'presapp01',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      const fullPath = `${Date.now().toString()}/${file.originalname}`;
      cb(null, fullPath)
    }
  }),
  files: 1,
  fileSize: 2000000,
  fileFilter: (req, file, cb) => {
    let isFinished = 0;
    const acceptedMimeTypes = [
      "image/jpeg",
      "image/png"
    ];

    for ( let i = 0; i < acceptedMimeTypes.length; i++ ) {
      if ( file.mimetype === acceptedMimeTypes[i] ) {
        isFinished = 1;
        return cb(null, true);
      }  
    }

    if ( isFinished === 0 ) {
      cb(null, false);
    }
  }
});

const deleteObject = (req, res, next) => {
  var item = req.body;
  const regex = /\d+\/\w+.\w+/gim;
  const key = item.file.match(regex).toString();
  var params = {
    Bucket: process.env.AWS_BUCKET,
    Key: key
  }
  
  s3.deleteObject(params, (err, data) => {
    if ( err ) {
      return res.send({err});
    }

    res.send({data});
  });

  next();
}

module.exports = {
  upload,
  deleteObject
};
