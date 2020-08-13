import { Document, Model, model, Schema } from 'mongoose';

interface AddressModel extends Document {
    getAddress(): string;
}

const AddressSchema = new Schema({
    street: { type: String, trim: true },
    number: { type: String, trim: true },
    neighborhood: { type: String, trim: true },
    complement: { type: String, trim: true },
    postal_code: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    latitude: { type: Number },
    longitude: { type: Number },
})

AddressSchema.methods.getAddress = function (): string {
    let address: string;
    if (this.street)`${address}, ${this.street}`;
    if (this.number)`${address}, ${this.number}`;
    if (this.neighborhood)`${address}, ${this.neighborhood}`;
    if (this.complement)`${address}, ${this.complement}`;
    if (this.postal_code)`${address}, ${this.postal_code}`;
    if (this.city)`${address}, ${this.city}`;
    if (this.state)`${address}, ${this.state}`;
    if (this.country)`${address}, ${this.country}`;

    return `${address}.`;
}

export const AddressModel: Model<AddressModel> = model<AddressModel>('Address', AddressSchema)
