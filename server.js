import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config';
import mongoose from 'mongoose';
import upload from './api/upload';

require('dotenv').config();

const database = config[config.env].database;

const db = mongoose.connection;
const app = express();
const port = process.env.PORT || '5000';


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.static('helpers'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

mongoose.connect(database, {useNewUrlParser: true});

app.use('/api/upload', upload);


db.on('error', console.error.bind(console, "Connection error"));
db.once('open', () => console.log("Connected sucessfully to database"));


app.listen(port, () => console.log("App running on " + port));

