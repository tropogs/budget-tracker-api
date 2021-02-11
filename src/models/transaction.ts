import mongoose, { Schema, Document } from 'mongoose';
import { SchemaFields } from 'utils/tsUtils';

export interface ITransaction {
  date: Date;
  userId: mongoose.Types.ObjectId;
  accountId: mongoose.Types.ObjectId;
  envelopeId: mongoose.Types.ObjectId;
  payee: string;
  amount: number;
  note: string;
}

export interface ITransactionDoc extends ITransaction, Document {}

const transactionSchemaFields: SchemaFields<ITransaction> = {
  date: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  accountId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  envelopeId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  payee: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
};

const TransactionSchema = new Schema(transactionSchemaFields);

const Transaction = mongoose.model<ITransactionDoc>('Transaction', TransactionSchema);

export default Transaction;
