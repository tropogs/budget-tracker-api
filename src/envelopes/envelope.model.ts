import mongoose, { Schema, Document } from 'mongoose';
import { SchemaFields } from 'utils/tsUtils';

export interface IEnvelope {
  name: string;
  activity: {
    [index: string]: {
      date: Date;
      amount: number;
    };
  };
  budgeted: {
    [index: string]: {
      date: Date;
      amount: number;
    };
  };
  goal: {
    type: string;
    amount: number;
  };
  userId: mongoose.Types.ObjectId;
}

export interface IEnvelopeDoc extends IEnvelope, Document {}

const envelopeSchemaFields: SchemaFields<IEnvelope> = {
  name: {
    type: String,
    required: true,
  },
  activity: [
    {
      date: Date,
      amount: Number,
    },
  ],
  budgeted: [
    {
      date: Date,
      amount: Number,
    },
  ],
  goal: [
    {
      type: String,
      amount: Number,
    },
  ],
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
};

const EnvelopeSchema = new Schema(envelopeSchemaFields);

const Envelope = mongoose.model<IEnvelopeDoc>('Envelopes', EnvelopeSchema);

export default Envelope;
