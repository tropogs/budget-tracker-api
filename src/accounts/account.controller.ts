import { Request, Response } from 'express';
import Account from './account.model';

const getAccounts = async (req: Request, res: Response) => {
  try {
    const account = await Account.find({});
    res.status(200).send(account);
  } catch (e) {
    res.status(400);
  }
};

export default getAccounts;
