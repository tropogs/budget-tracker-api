// TODO: Separate Express 'app' and 'server'
/* eslint-disable no-console */
import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import errorHandler from 'error/errorHandler';

dotenv.config();
const { DB_URL, APP_PORT } = process.env as any;

// Boot express
const app: Application = express();

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to db!');
});

app.use('/', (req, res) => {
  res.status(200).send({ data: 'Hello from the other side' });
});

app.use(errorHandler);

// Start server
app.listen(APP_PORT, () => console.log(`Server is listening on port ${APP_PORT}!`));
