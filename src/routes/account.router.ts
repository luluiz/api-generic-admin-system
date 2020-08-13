import { Router } from 'express';
import AccountController from '../controllers/account.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import IdValidation from '../middlewares/id-validation.middleware';

export class AccountRouter {
    private router = Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/account', AuthMiddleware.verify, AccountController.get);
        this.router.get('/account/:id', AuthMiddleware.verify, IdValidation.valid, AccountController.getById);
        this.router.post('/account', AuthMiddleware.verify, AccountController.create);
        this.router.put('/account/:id', AuthMiddleware.verify, IdValidation.valid, AccountController.edit);
        this.router.delete('/account/:id', AuthMiddleware.verify, IdValidation.valid, AccountController.delete);
    }

    public getRouter(): Router {
        return this.router;
    }
}