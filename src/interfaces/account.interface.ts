import { Document } from "mongoose";
import { Address } from "./address.interface";
import { Attachment } from "./attachment.interface";
import { IQuery } from "./query.interface";

export interface Account extends Document, IQuery {
    master_email: string;
    status: string;
    logo: Attachment,
    address: Address,
    deactivated: boolean;
}