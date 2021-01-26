import mongoose, { Schema, Document } from 'mongoose';
import { SchemaFields } from 'utils/tsUtils';

export interface IUser {
  firstName: string;
  lastName: string;
  envelopes: {
    name: string;
  }[];
  accounts: {
    name: string;
  }[];
  payees: {
    name: string;
  }[];
}

export interface IUserDoc extends IUser, Document {}

const userSchemaFields: SchemaFields<IUser> = {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  envelopes: [
    {
      name: String,
    },
  ],
  accounts: [
    {
      name: String,
    },
  ],
  payees: [
    {
      name: String,
    },
  ],
};

const UserSchema = new Schema(userSchemaFields);

const User = mongoose.model<IUserDoc>('User', UserSchema);

export default User;
