import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

export class AuthRouter {
    private router = Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/login', AuthController.login);
        this.router.post('/register', AuthController.register);
        this.router.post('/password/forgot', AuthController.forgotPassword);
        this.router.post('/password/validate_token', AuthController.validateTokenEditPassword);
        this.router.post('/password/recover', AuthController.recoverPassword);
    }

    public getRouter(): Router {
        return this.router;
    }
}