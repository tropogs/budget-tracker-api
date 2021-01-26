import mongoose, { Schema, Document } from 'mongoose';
import { SchemaFields } from 'utils/tsUtils';

export enum accountType {
  savings = 'Savings',
  checking = 'Checking',
  cash = 'Cash',
  cc = 'CC',
}

export interface IAccount {
  name: string;
  type: accountType;
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
    enum: Object.values(accountType),
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
