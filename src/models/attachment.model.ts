import { Model, model, Schema } from 'mongoose';
const AttachmentSchema = new Schema({
    originalname: { type: String },
    filename: { type: String },
    destination: { type: String },
    size: { type: Number },
    path: { type: String },
    description: { type: String },
    url: { type: String },
}, {
    timestamps: true
});

export const AttachmentModel: Model<any> = model('Attachment', AttachmentSchema);
