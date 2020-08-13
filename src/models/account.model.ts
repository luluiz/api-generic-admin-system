import { Model, model, Schema, Types } from 'mongoose';
import { Account } from '../interfaces/account.interface';
import ModelValidators from "../utils/model-validators";
import { AddressModel } from './address.model';
import { AttachmentModel } from './attachment.model';

const AccountSchema = new Schema({
    master_user: { type: Types.ObjectId, ref: 'User' },
    email: { type: String, lowercase: true, trim: true, validate: ModelValidators.email },
    status: { type: String, enum: ['PENDING', 'ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
    logo: AttachmentModel.schema,
    address: AddressModel.schema,
    deactivated: { type: Boolean, default: false },
}, {
    timestamps: true
});

export const AccountModel: Model<Account> = model<Account>('Account', AccountSchema);