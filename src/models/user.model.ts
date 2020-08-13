import { Document, Schema, Model, model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import ModelValidators from "../utils/model-validators";

export interface UserModel extends User, Document {
    _id: string,
    fullName(): string
}

const UserSchema = new Schema({
    // email: { type: String, unique: true, required: true, lowercase: true, trim: true, validate: ModelValidators.email(), index: true },
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    // phone: { type: String, required: true, trim: true },
    // password: { type: String, required: true, trim: true, validate: ModelValidators.password() },
    // type: { type: String, required: true, uppercase: true, enum: ['ADMIN', 'SELLER'] },
    // is_visible: { type: Boolean, default: true },
}, {
    timestamps: true
})

UserSchema.methods.fullName = function (): string {
    return (this.firstName.trim() + ' ' + this.lastName.trim())
}

export const UserModel: Model<UserModel> = model<UserModel>('User', UserSchema)