import { Router } from 'express';
import UserController from '../controllers/user.controller';

export class UserRouter {
    private router = Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/user', UserController.get);
        this.router.get('/user/:id', UserController.getById);
        this.router.post('/user', UserController.create);
        this.router.put('/user/:id', UserController.edit);
        this.router.delete('/user/:id', UserController.delete);
    }

    public getRouter(): Router {
        return this.router;
    }
}