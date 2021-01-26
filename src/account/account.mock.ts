import faker from 'faker';
import { accountType, IAccount } from '../account/account.model';

const accountMock = (override?: IAccount): IAccount => ({
  name: faker.finance.accountName(),
  type: accountType.checking,
  startingBal: faker.random.number(),
  amount: faker.random.number(),
  ...override,
});

export default accountMock;
