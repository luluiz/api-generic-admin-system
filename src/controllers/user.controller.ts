import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { ResponseJSON } from '../interfaces/response-json.interface';
import { UserService } from "./user.service";

class UserController {
    public async get(req: Request, res: Response): Promise<Response> {
        let conditions = new UserService().setConditions(req);
        let select = new UserService().setSelect(req);
        // const populate_account = this.setPopulate(<string>req.query.populate_account, 'id_account');

        const users = await UserModel
            .find(conditions)
            .select(select)
        // .populate(populate_account)

        return res.json(<ResponseJSON>{ success: true, data: users });
    }

    public async getById(req: Request, res: Response): Promise<Response> {
        let select = new UserService().setSelect(req);
        // const populate_account = this.setPopulate(<string>req.query.populate_account, 'id_account');

        const user = await UserModel
            .findById(req.params.id)
            .select(select)
        // .populate(populate_account)

        return res.json(<ResponseJSON>{ success: true, data: user });
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const user = await UserModel.create(req.body);
        return res.json(<ResponseJSON>{ success: true, message: 'Successfully created.', data: user });
    }

    public async edit(req: Request, res: Response): Promise<Response> {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body,
            { new: true, useFindAndModify: true, runValidators: true });

        return res.json(<ResponseJSON>{ success: true, message: 'Successfully updated.', data: user });
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const user = await UserModel.findByIdAndDelete(req.params.id);

        return res.json(<ResponseJSON>{ success: true, message: 'Successfully updated.' });
    }
}

export default new UserController();