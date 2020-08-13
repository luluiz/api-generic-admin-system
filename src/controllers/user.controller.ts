import { Request, Response } from 'express';
import { NativeError } from 'mongoose';
import { ResponseJSON } from '../interfaces/response-json.interface';
import { UserModel } from '../models/user.model';
import { UserService } from "../services/user.service";

class UserController {
    public async get(req: Request, res: Response): Promise<Response> {
        let conditions = new UserService().setConditions(req);
        let select = new UserService().setSelect(req);
        let populate_account = new UserService().setPopulate(<string>req.query.populate_account, 'account');

        const users = await UserModel
            .find(conditions)
            .select(select)
            .populate(populate_account)

        return res.json(<ResponseJSON>{ success: true, data: users });
    }

    public async getById(req: Request, res: Response): Promise<Response> {
        let select = new UserService().setSelect(req);
        let populate_account = new UserService().setPopulate(<string>req.query.populate_account, 'account');

        const user = await UserModel
            .findById(req.params.id)
            .select(select)
            .populate(populate_account)

        return res.json(<ResponseJSON>{ success: true, data: user });
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const user = await UserModel
            .create(req.body)
            .catch(e => {
                res.status(500).json(<ResponseJSON>{ success: false, message: 'Something went wrong. ' + e.message, error: e });
            });

        if (user)
            return res.json(<ResponseJSON>{ success: true, message: 'Successfully created.', data: user });
    }

    public edit(req: Request, res: Response) {
        UserModel
            .findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .exec((error: NativeError, doc: UserModel) => {
                if (error)
                    res.status(500).json(<ResponseJSON>{ success: false, message: 'Something went wrong. ' + error.message, error: error });
                else if (!doc)
                    res.json(<ResponseJSON>{ success: true, message: 'Register not found.' });
                else
                    res.json(<ResponseJSON>{ success: true, message: 'Successfully updated.', data: doc });
            });
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const user = await UserModel.findByIdAndDelete(req.params.id);

        if (user) return res.json(<ResponseJSON>{ success: true, message: 'Successfully updated.' });
        else return res.json(<ResponseJSON>{ success: false, message: 'Register not found. It may be already deleted.' });
    }

    public async changePassword(req: Request, res: Response) {
        if (req.body.new_password !== req.body.confirm_password)
            res.json({ success: false, message: 'Passwords do not match.' });
        if (!req.body.password)
            res.json({ success: false, message: 'Password is required' });
        else
            UserModel.findById(req.params.id, async (error, user) => {
                if (error) res.json({ success: false, message: 'Something went wrong.', error: error });
                else if (!user) res.json({ success: false, message: 'User not registered.' });
                else if (await user.comparePasswords(req.body.password)) {
                    user.password = req.body.new_password;
                    user.save(error => {
                        if (error) res.json({ success: false, message: 'Something went wrong while saving the new password.' });
                        else res.json({ success: true, message: 'Password changed successfully.' });
                    });
                } else res.json({ success: false, message: 'Invalid current password' });
            });
    }

    public async changePasswordAdmin(req: Request, res: Response) {
        if (req.body.new_password !== req.body.confirm_password)
            res.json({ success: false, message: 'Passwords do not match.' });
        else
            UserModel.findById(req.params.id, async (error, user) => {
                if (error) res.json({ success: false, message: 'Something went wrong.', error: error });
                else if (!user) res.json({ success: false, message: 'User not registered.' });
                else {
                    user.password = req.body.new_password;
                    user.save(error => {
                        if (error) res.json({ success: false, message: 'Something went wrong while saving the new password.' });
                        else res.json({ success: true, message: 'Password changed successfully.' });
                    });
                }
            });
    }
}

export default new UserController();