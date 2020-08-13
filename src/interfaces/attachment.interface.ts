import mongoose from "mongoose";

export interface Attachment {
    _id?: string | mongoose.Types.ObjectId;
    originalname: string;
    filename: string;
    destination: string;
    size: number;
    path: string;
    description: string;
    url: string;
}
