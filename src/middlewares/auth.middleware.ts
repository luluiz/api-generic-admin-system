import { NextFunction, Request, Response } from 'express';
import { verify, VerifyErrors } from 'jsonwebtoken';

class AuthMiddleware {
    public verify(req: Request, res: Response, next: NextFunction) {
        const token: string = req.headers.authorization?.replace('Bearer', '').trim();
        const secret: string = process.env.JWT_SECRET;

        if (token) {
            verify(token, secret, (error: VerifyErrors, decoded: any) => {
                if (error)
                    res.status(401).send('Unauthorized: invalid token.');
                else if (this.isExpired(decoded.exp))
                    res.status(403).send('Unauthorized: expired token.');
                else {
                    req.body.decoded = decoded;
                    next();
                }
            });
        } else
            res.status(401).send({ success: false, message: 'Token not found.' });
    }

    /**
     * Verify if token is expired
     * @param {number} exp 
     */
    private isExpired(exp: number): boolean {
        var timeStamp = Math.floor(Date.now() / 1000);
        var timeCheck = exp - timeStamp;

        return (timeCheck < 0) ? true : false;
    }
}

export default new AuthMiddleware();