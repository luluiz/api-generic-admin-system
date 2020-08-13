import { Request, Response } from 'express';
import { NativeError } from 'mongoose';
import { Account } from '../interfaces/account.interface';
import { ResponseJSON } from '../interfaces/response-json.interface';
import { AccountModel } from '../models/account.model';
import { AccountService } from "../services/account.service";

class AccountController {
    public async get(req: Request, res: Response): Promise<Response> {
        let conditions = new AccountService().setConditions(req);
        let select = new AccountService().setSelect(req);
        let populate_master_user = new AccountService().setPopulate(<string>req.query.populate_master_user, 'master_user');

        const users = await AccountModel
            .find(conditions)
            .select(select)
            .populate(populate_master_user)

        return res.json(<ResponseJSON>{ success: true, data: users });
    }

    public async getById(req: Request, res: Response): Promise<Response> {
        let select = new AccountService().setSelect(req);
        let populate_master_user = new AccountService().setPopulate(<string>req.query.populate_master_user, 'master_user');

        const account = await AccountModel
            .findById(req.params.id)
            .select(select)
            .populate(populate_master_user)

        return res.json(<ResponseJSON>{ success: true, data: account });
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const account = await AccountModel
            .create(req.body)
            .catch(e => {
                res.status(500).json(<ResponseJSON>{ success: false, message: 'Something went wrong. ' + e.message, error: e });
            });

        if (account)
            return res.json(<ResponseJSON>{ success: true, message: 'Successfully created.', data: account });
    }

    public edit(req: Request, res: Response) {
        AccountModel
            .findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .exec((error: NativeError, doc: Account) => {
                if (error)
                    res.status(500).json(<ResponseJSON>{ success: false, message: 'Something went wrong. ' + error.message, error: error });
                else if (!doc)
                    res.json(<ResponseJSON>{ success: true, message: 'Register not found.' });
                else
                    res.json(<ResponseJSON>{ success: true, message: 'Successfully updated.', data: doc });
            });
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const account = await AccountModel.findByIdAndDelete(req.params.id);

        if (account) return res.json(<ResponseJSON>{ success: true, message: 'Successfully updated.' });
        else return res.json(<ResponseJSON>{ success: false, message: 'Register not found. It may be already deleted.' });
    }
}

export default new AccountController();