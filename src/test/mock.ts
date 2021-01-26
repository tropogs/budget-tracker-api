import faker from 'faker';
import mongoose from 'mongoose';
import { IUser } from '../models/user';
import { accountType, IAccount } from '../models/account';

export const generateArray = (numElements: number, generator: () => any) => {
  const arr = new Array(numElements).fill(null).map(() => ({
    _id: mongoose.Types.ObjectId(),
    ...generator(),
  }));
  return arr;
};

interface IUserOptions {
  numEnvelopes?: number;
  numAccounts?: number;
  numPayees?: number;
}

const user = (override?: IUser, options?: IUserOptions): IUser => {
  const { numEnvelopes = 3, numAccounts = 3, numPayees = 3 } = options || {};

  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    envelopes: generateArray(numEnvelopes, () => ({
      name: faker.company.companyName(),
    })),
    accounts: generateArray(numAccounts, () => ({
      name: faker.finance.accountName(),
    })),
    payees: generateArray(numPayees, () => ({
      name: faker.name.findName(),
    })),
    ...override,
  };
};

const account = (override?: IAccount): IAccount => ({
  name: faker.finance.accountName(),
  type: accountType.checking,
  startingBal: faker.random.number(),
  amount: faker.random.number(),
  ...override,
});

const mockObject = {
  user,
  account,
};

export default mockObject;
