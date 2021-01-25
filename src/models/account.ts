import mongoose, { Schema, Document } from 'mongoose';
import { SchemaFields } from 'utils/tsUtils';

export interface IAccount {
  name: string;
  type: string;
  startingBal: number;
  amount: number;
}

export interface IAccountDoc extends IAccount, Document {}

const accountSchemaFields: SchemaFields<IAccount> = {
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  startingBal: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
};

const AccountSchema = new Schema(accountSchemaFields);

const Account = mongoose.model<IAccountDoc>('Account', AccountSchema);

export default Account;
