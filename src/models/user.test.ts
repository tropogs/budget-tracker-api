import User, { IUser } from './user';

import setupDB from '../test/setupDB';
import mockData from '../test/mock';

// import User from './user';

describe('User Model', () => {
  let testData: IUser;

  setupDB();

  beforeEach(() => {
    testData = mockData.user();
  });

  it('User should be created', async done => {
    const createdUser = new User(testData);

    await createdUser.save();

    const user = await User.find({ firstName: testData.firstName }, '-_id -__v', { lean: true });

    expect(user).toStrictEqual([testData]);
    done();
  });

  it('User create should fail when incomplete', async done => {
    const { firstName, ...data } = testData;
    const user = new User(data);

    await expect(user.save()).rejects.toThrowError();
    done();
  });
});
