import { Request, Response, NextFunction } from 'express';

export class UserController {
    //           --------REGISTER-------
    static register(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, password } = req.body;
            res.status(200).json({
                status: 200,
                message: 'Code sent to user email',
            });
        } catch (err: any) {
            next(err);
        }
    }
}
