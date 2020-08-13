import { Router } from 'express';
import UserController from '../controllers/user.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import IdValidation from '../middlewares/id-validation.middleware';

export class UserRouter {
    private router = Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/user', AuthMiddleware.verify, UserController.get);
        this.router.get('/user/:id', AuthMiddleware.verify, IdValidation.valid, UserController.getById);
        this.router.post('/user', AuthMiddleware.verify, UserController.create);
        this.router.put('/user/:id', AuthMiddleware.verify, IdValidation.valid, UserController.edit);
        this.router.delete('/user/:id', AuthMiddleware.verify, IdValidation.valid, UserController.delete);


        this.router.put('/user/password/:id', AuthMiddleware.verify, IdValidation.valid, UserController.changePassword);
        this.router.post('/user/password/admin/:id', AuthMiddleware.verify, IdValidation.valid, UserController.changePasswordAdmin);
    }

    public getRouter(): Router {
        return this.router;
    }
}