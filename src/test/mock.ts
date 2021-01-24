import faker from 'faker';
import mongoose from 'mongoose';
import { IUser } from '../models/user';

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

const mockObject = {
  user,
};

export default mockObject;
