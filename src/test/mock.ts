import faker, { fake } from 'faker';
import mongoose from 'mongoose';
import { IUser } from '../models/user';
import { accountType, IAccount } from '../accounts/account.model';
import { ITransaction } from '../models/transaction';
import { IEnvelope } from '../envelopes/envelope.model';

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

const transaction = (override?: ITransaction): ITransaction => ({
  date: faker.date.recent(),
  userId: new mongoose.Types.ObjectId(),
  accountId: new mongoose.Types.ObjectId(),
  envelopeId: new mongoose.Types.ObjectId(),
  payee: faker.name.findName(),
  amount: faker.random.number(),
  note: faker.finance.transactionDescription(),
  ...override,
});

const envelope = (override?: IEnvelope): IEnvelope => ({
  name: faker.company.companyName(),
  activity: {
    [faker.random.number()]: {
      date: faker.date.recent(),
      amount: faker.random.number(),
    },
  },
  budgeted: {
    [faker.random.number()]: {
      date: faker.date.recent(),
      amount: faker.random.number(),
    },
  },
  goal: {
    type: faker.finance.transactionType(),
    amount: faker.random.number(),
  },
  userId: new mongoose.Types.ObjectId(),
  ...override,
});

const mockObject = {
  user,
  account,
  transaction,
  envelope,
};

export default mockObject;
