import faker from 'faker';

import { generateArray } from '../utils/testUtils';

import { IUser } from './user.model';

interface IUserOptions {
  numEnvelopes?: number;
  numAccounts?: number;
  numPayees?: number;
}

const userMock = (override?: IUser, options?: IUserOptions): IUser => {
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

export default userMock;
