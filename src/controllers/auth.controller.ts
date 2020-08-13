import { Request, Response } from 'express';
import { sign, SignOptions } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { Account } from '../interfaces/account.interface';
import { AuthTokenParams } from '../interfaces/auth-token.interface';
import { ResponseJSON } from '../interfaces/response-json.interface';
import { User } from '../interfaces/user.interface';
import { AccountModel } from '../models/account.model';
import { UserModel } from '../models/user.model';

class AuthController {
    public async login(req: Request, res: Response) {
        if (!req.body.email) res.json({ success: false, message: 'Informe o e-mail.' });
        else if (!req.body.password) res.json({ success: false, message: 'Informe uma senha.' });
        else UserModel.findOne({ email: req.body.email })
            .select('_id password email type account')
            .populate({ path: 'account', select: '_id email theme name store_id store_name status deactivated logo' })
            .exec(async (error, user: UserModel) => {
                let comparePasswords: boolean;

                if (!error && user)
                    comparePasswords = await user.comparePasswords(req.body.password);

                if (error)
                    res.json({ success: false, message: 'An error occurred while logging in.', error: error });
                else if (!user)
                    res.json({ success: false, message: 'User not found.', error: error });
                else if (comparePasswords) {
                    let token = await this.generateToken(user._id);
                    user = user.toObject();
                    delete user.password;
                    res.json({ success: true, message: 'Login successfully', data: { token: token, user: user } });
                } else
                    res.json({ success: false, message: 'Invalid password.' });
            });

        return res.json(<ResponseJSON>{ success: true, data: null });
    }

    public async register(req: Request, res: Response): Promise<Response> {
        if (!req.body.email) res.json({ success: false, message: 'E-mail is required' });
        else if (!req.body.name) res.json({ success: false, message: 'Name is required.' });
        else if (!req.body.password) res.json({ success: false, message: 'Password is required.' });
        else if (!req.body.password_confirm) res.json({ success: false, message: 'Password confirmation is required.' });
        else if (req.body.password != req.body.password_confirm) res.json({ success: false, message: 'Passwords do not match.' });
        else {
            let account = new AccountModel(req.body);
            account._id = Types.ObjectId();
            account.master_email = req.body.email;

            account.save(async (error, _account) => {
                if (error && error.keyValue && error.keyValue.email)
                    res.json({ success: false, message: 'E-mail already registered.', error: error });
                else if (error)
                    res.status(500).json({ success: false, message: 'Something went wrong', error: error });
                else {
                    let user = new UserModel({
                        account: account._id,
                        email: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        password: req.body.password,
                        type: req.body.type,
                    });

                    user = await user.save();

                    if (!user)
                        res.json(<ResponseJSON>{ success: false, message: 'Error registering user.' });
                    else {
                        user = user.toObject();
                        delete user.password;
                        res.json(<ResponseJSON>{
                            success: true, message: 'Successfully registered.', data: {
                                account: _account,
                                user: user,
                                token: await this.generateToken(user._id)
                            }
                        })
                    }
                }
            });
        }

        return res.json(<ResponseJSON>{ success: true, data: null });
    }

    public async forgotPassword(req: Request, res: Response) {
        return res.status(501).send('Coming soon');
    }

    public async validateTokenEditPassword(req: Request, res: Response) {
        return res.status(501).send('Coming soon');
    }

    public async recoverPassword(req: Request, res: Response) {
        return res.status(501).send('Coming soon');
    }


    public async generateToken(user_id?: string, user_email?: string, expiresIn?: string): Promise<string> {
        // caso não possua o usuário, pega o email ou _id do usuário para buscar.
        let conditions: User;
        if (user_id) conditions._id = user_id;
        if (user_email) conditions.email = user_email;

        let user = await UserModel.findOne(conditions)
            .select('_id email type account')
            .populate({ path: 'account', select: '_id email status deactivated' });

        if (!user) return null;
        else {
            const tokenParams = this.setAuthTokenParams(user, user.account as Account);
            const options: SignOptions = {
                expiresIn: expiresIn ? expiresIn : '12h'
            };
            const secret: string = process.env.JWT_SECRET;

            return sign(tokenParams, secret, options).toString();
        };
    }

    private setAuthTokenParams(user: User, account: Account): AuthTokenParams {
        return {
            user_id: user._id,
            user_type: user.type,
            account_id: account._id,
        }
    }
}

export default new AuthController();