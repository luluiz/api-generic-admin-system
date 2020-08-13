import { Request } from 'express';
import Moment from 'moment-timezone';
import { User } from "../interfaces/user.interface";
import { QueryService } from './query.service';

export class UserService extends QueryService {
    constructor() {
        super();
    }

    public setConditions(req: Request): any {
        try {
            let reqQuery: User = req.query as any;
            let conditions: any = {};

            if (reqQuery._id) conditions._id = reqQuery._id;
            if (reqQuery.account) conditions.account = reqQuery.account;
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
}