/* eslint-disable no-console */
import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import accountsRouter from './accounts/account.routes';

// Boot express
const app: Application = express();
const port = 5000;

mongoose.connect('mongodb://localhost/tropogs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to db!');
});

// Application routing
app.use('/ping', (req: Request, res: Response, next) => {
  res.status(200).send({ data: 'Hello from the other side' });
});

app.use('/accounts', accountsRouter);

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
