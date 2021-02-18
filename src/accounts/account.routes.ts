import express from 'express';
import getAccounts from './account.controller';

const accountsRouter = express.Router();

accountsRouter.get('/', getAccounts);

export default accountsRouter;
