import express from ' express';

const app = express.Router();

app.post('/', async (req, res) => {
  console.log(req)
});

module.exports = app;