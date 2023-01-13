import { Router } from 'express';
import validations from '../middlewares/validation.middlewares.js';
import { UserController } from '../controllers/user.controller.js';

const authRouter = Router();

//register routes

authRouter.post('/register', validations, UserController.register);

export default authRouter;
