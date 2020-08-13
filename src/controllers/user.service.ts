import { UserQuery } from "../interfaces/user.interface";
import Moment from 'moment-timezone';
import { Request } from 'express';

export class UserService {
    constructor() {
    }

    public setConditions(req: Request): any {
        try {
            let reqQuery: UserQuery = req.query as any;
            let conditions: any = {};

            if (reqQuery._id) conditions._id = reqQuery._id;
            // if (reqQuery.id_account) conditions.id_account = reqQuery.id_account as string;
            if (reqQuery.email) conditions.email = { $regex: reqQuery.email, $options: 'i' };
            if (reqQuery.firstName) conditions.firstName = { $regex: reqQuery.firstName, $options: 'i' };
            if (reqQuery.lastName) conditions.lastName = { $regex: reqQuery.lastName, $options: 'i' };
            if (reqQuery.createdAt) conditions.createdAt = reqQuery.createdAt;
            if (reqQuery.updatedAt) conditions.updatedAt = reqQuery.updatedAt;
            if (reqQuery.createdFrom && reqQuery.createdTo) conditions.created = {
                $gte: Moment(new Date(reqQuery.createdFrom)).startOf('day').toDate(),
                $lte: Moment(new Date(reqQuery.createdTo)).endOf('day').toDate()
            };
            if (reqQuery.updatedFrom && reqQuery.updatedTo) conditions.updatedTo = {
                $gte: Moment(new Date(reqQuery.updatedFrom)).startOf('day').toDate(),
                $lte: Moment(new Date(reqQuery.updatedTo)).endOf('day').toDate()
            };

            return conditions;
        } catch (e) {
            console.error('Error setting conditions', e);
            return {};
        }
    }

    public setSelect(req) {
        let select: string = '';
        if (req.query.select) select = req.query.select;
        return select;
    }

    public setPopulate(select: string, path: string): { path: string, select: string } | null {
        return select ? { path: path, select: select } : null;
    }
}