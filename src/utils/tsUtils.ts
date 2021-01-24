import { SchemaDefinitionProperty, Document } from 'mongoose';

export type SchemaFields<T = Record<any, any>> = Record<
  keyof Omit<T, keyof Document>,
  SchemaDefinitionProperty
>;
