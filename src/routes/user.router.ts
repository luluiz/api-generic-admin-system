import { Router } from 'express';
import UserController from '../controllers/user.controller';

export class UserRouter {
    private router = Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/users', UserController.get);
        this.router.get('/users/:id', UserController.getById);
        this.router.post('/users', UserController.create);
        this.router.put('/users', UserController.edit);
        this.router.delete('/users', UserController.delete);
    }

    public getRouter(): Router {
        return this.router;
    }
}