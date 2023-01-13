import { Request, Response, NextFunction } from 'express';
import UserService from '../service/user.service.js';

export class UserController {
    //           --------REGISTER-------
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, username } = req.body;
            await UserService.register(email, password, username);
            res.status(200).json({
                status: 200,
                message: 'Code sent to user email',
            });
        } catch (err: any) {
            next(err);
        }
    }
}
