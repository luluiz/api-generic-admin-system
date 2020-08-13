import { Router } from 'express';
import AccountController from '../controllers/account.controller';

export class AccountRouter {
    private router = Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/account', AccountController.get);
        this.router.get('/account/:id', AccountController.getById);
        this.router.post('/account', AccountController.create);
        this.router.put('/account/:id', AccountController.edit);
        this.router.delete('/account/:id', AccountController.delete);
    }

    public getRouter(): Router {
        return this.router;
    }
}