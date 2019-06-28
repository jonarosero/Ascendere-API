import { Document, Schema, model } from 'mongoose';

/**
 * TODO: add documentation
 */
export class User {
  createdAt: Date;
  displayName: String;
  email: String;
  emailVerified: Boolean;
  isAnonymous: Boolean;
  lastLoginAt: Date;
  phoneNumber: number;
  photoUrl: String;
  providerData: Array<ProviderData>;
}

export class ProviderData {}

let schema = new Schema({
  encuentroID: { required: true, type: Schema.Types.ObjectId },
  userID: { required: true, type: Schema.Types.ObjectId },
  inscriptionDate: { required: true, type: Date, default: Date.now() },
  inscriptionApproved: { required: true, type: Boolean, default: false }
});

/**
 * TODO: add documentation
 */
export interface UserDocument extends User, Document {}

/**
 * TODO: add documentation
 */
export const UserModel = model<UserDocument>('User', schema);
