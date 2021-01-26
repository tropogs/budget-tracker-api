import { setupDB } from '../utils/testUtils';
import accountMock from './account.mock';
import Account, { IAccount } from './account.model';

describe('Account Model', () => {
  let testAccountData: IAccount;

  setupDB();

  beforeEach(() => {
    testAccountData = accountMock();
  });

  it('Account should be created', async done => {
    const createdAccount = new Account(testAccountData);

    await createdAccount.save();

    const account = await Account.find({ name: testAccountData.name }, '-_id -__v', { lean: true });

    expect(account).toStrictEqual([testAccountData]);
    done();
  });

  it('Account create should fail when incomplete', async done => {
    const { name, ...data } = testAccountData;
    const account = new Account(data);

    await expect(account.save()).rejects.toThrowError();
    done();
  });
});
