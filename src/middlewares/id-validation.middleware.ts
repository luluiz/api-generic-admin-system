import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

class IdValidation {
    public valid(req: Request, res: Response, next: NextFunction) {
        if (req.params.id && Types.ObjectId.isValid(req.params.id)) {
            next();
        } else {
            res.status(400).json({ success: false, message: 'Invalid ID' });
        }
    }
}

export default new IdValidation();


