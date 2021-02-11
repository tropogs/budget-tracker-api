import Transaction, { ITransaction } from './transaction';

import setupDB from '../test/setupDB';
import mockData from '../test/mock';

describe('Transaction Model', () => {
  let testTransactionData: ITransaction;

  setupDB();

  beforeEach(() => {
    testTransactionData = mockData.transaction();
  });

  it('Transaction should be created', async done => {
    const createdTransaction = new Transaction(testTransactionData);

    await createdTransaction.save();

    const transaction = await Transaction.find({ payee: testTransactionData.payee }, '-_id -__v', {
      lean: true,
    });

    expect(transaction).toStrictEqual([testTransactionData]);
    done();
  });

  it('Transaction create should fail when incomplete', async done => {
    const { date, ...data } = testTransactionData;
    const transaction = new Transaction(data);

    await expect(transaction.save()).rejects.toThrowError();
    done();
  });
});
