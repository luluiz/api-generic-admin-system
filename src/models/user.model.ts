import Bcrypt from "Bcrypt";
import { Document, Model, model, Schema, Types } from 'mongoose';
import { Address } from '../interfaces/address.interface';
import { User } from '../interfaces/user.interface';
import ModelValidators from "../utils/model-validators";
import { AddressModel } from './address.model';

export interface UserModel extends User, Address, Document {
    getFullName(): string;
    comparePasswords(password: string): boolean;
};

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true, lowercase: true, trim: true, index: true, validate: ModelValidators.email },
    account: { type: Types.ObjectId, index: true, ref: 'Account' },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String, trim: true },
    address: AddressModel.schema,
    password: { type: String, required: true, trim: true, validate: ModelValidators.password },
    type: { type: String, required: true, uppercase: true, enum: ['ADMIN', 'TYPE_A', 'TYPE_B'] },
    is_visible: { type: Boolean, default: true },
}, {
    timestamps: true
});

UserSchema.pre('save', async function () {
    this['password'] = await Bcrypt.hash(this['password'], 10);
});

UserSchema.methods.getFullName = (): string => {
    return (this.firstName.trim() + ' ' + this.lastName.trim())
};

UserSchema.methods.comparePasswords = (password: string) => {
    return Bcrypt.compareSync(password, this.password);
};


export const UserModel: Model<UserModel> = model<UserModel>('User', UserSchema);