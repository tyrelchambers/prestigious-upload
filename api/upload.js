import express from 'express';
import sessionValidation from '../helpers/sessionValidation';
import { upload, deleteObject } from '../libs/aws';

const anyUpload = upload.any();

const app = express.Router();

app.post('/upload', sessionValidation, (req, res) => {
  anyUpload(req, res, (err) => {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
    }
    for ( let i = 0; i < req.files.length; i++ ) {
      res.send(req.files[i].location);
    }
  });

});

app.delete('/revert', deleteObject, (req, res) => {
});


module.exports = app;