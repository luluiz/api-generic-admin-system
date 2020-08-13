import { Request } from 'express';
import Moment from 'moment-timezone';
import { Account } from "../interfaces/account.interface";
import { QueryService } from './query.service';

export class AccountService extends QueryService {
    constructor() {
        super();
    }

    public setConditions(req: Request): any {
        try {
            let reqQuery: Account = req.query as any;
            let conditions: any = {};

            if (reqQuery._id) conditions._id = reqQuery._id;
            if (reqQuery.email) conditions.email = { $regex: reqQuery.email, $options: 'i' };
            if (reqQuery.status) conditions.status = reqQuery.status;
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