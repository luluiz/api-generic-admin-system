import { Document, Types } from "mongoose";
import { Account } from "./account.interface";
import { Address } from "./address.interface";
import { IQuery } from "./query.interface";

enum UserType {
    Admin = 'ADMIN',
    TypeA = 'TYPE_A',
    TypeB = 'TYPE_B',
}

export interface User extends Document, IQuery {
    account?: string | Types.ObjectId | Account;
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    address?: Address;
    type?: UserType;
    is_visible?: boolean;
}