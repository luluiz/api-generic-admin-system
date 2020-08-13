import mongoose from "mongoose";

export interface User extends Document {
    _id?: string | mongoose.Types.ObjectId;
    email?: string;
    firstName?: string;
    lastName?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserQuery extends User {
    createdFrom?: Date;
    createdTo?: Date;
    updatedFrom?: Date;
    updatedTo?: Date;
}