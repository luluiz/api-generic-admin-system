import { NextFunction, Request, Response } from 'express';
import Moment from 'moment-timezone';

class LoggerMiddleware {
    public log(req: Request, res: Response, next: NextFunction) {
        console.log(`${Moment().format('DD/MM/YYYY HH:mm:ss')} - ${req.method} ${req.path}`);
        next();
    }
}

export default new LoggerMiddleware();