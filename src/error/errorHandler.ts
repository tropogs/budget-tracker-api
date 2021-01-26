import { ErrorRequestHandler } from 'express';
import GenericError from './GenericError';

const errorHandler: ErrorRequestHandler = (error: GenericError, req, res) => {
  if (!error.statusCode) {
    // eslint-disable-next-line no-param-reassign
    error.statusCode = 500;
  }

  if (error.statusCode === 301) {
    return res.status(301).redirect('/not-found');
  }

  return res.status(error.statusCode).json({ error: error.toString() });
};

export default errorHandler;
