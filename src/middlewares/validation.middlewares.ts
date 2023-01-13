import Validation from '../utils/validation.js';
import { ValidationError } from '../utils/errors.js';
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        Validation(req.method, req.url, req.body);
        return next();
    } catch (error) {
        return next(new ValidationError(400, error.message));
    }
};
