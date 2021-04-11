import Envelope, { IEnvelope } from './envelope.model';

import setupDB from '../test/setupDB';
import mockData from '../test/mock';

describe('Envelope Model', () => {
  let testEnvelopeData: IEnvelope;

  setupDB();

  beforeEach(() => {
    testEnvelopeData = mockData.envelope();
  });

  it('Envelope should be created', async done => {
    const createdEnvelope = new Envelope(testEnvelopeData);

    await createdEnvelope.save();

    const envelope = await Envelope.find({ name: testEnvelopeData.name }, '-_id-__v', {
      lean: true,
    });

    expect(envelope).toStrictEqual([testEnvelopeData]);
    done();
  });

  it('Transaction create should fail when incomplete', async done => {
    const { name, ...data } = testEnvelopeData;
    const envelope = new Envelope(data);

    await expect(envelope.save()).rejects.toThrowError();
    done();
  });
});
