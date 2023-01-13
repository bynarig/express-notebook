import express, {
    Request,
    Response,
    NextFunction,
    ErrorRequestHandler,
} from 'express';
import authRouter from './routing/log.routes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());

function InitRoutes() {
    app.use('/user', authRouter);
}

InitRoutes();

app.use((error: any, req: Request, res: Response) => {
    // its our error handler middleware
    if (error.status !== 500) {
        // if error is not internal server error its response, we also write it in our logger
        return res.status(400).json({
            status: 400,
            message: error.message,
        });
    }

    fs.appendFileSync(
        // writing error in our logger file
        path.join(process.cwd(), 'log.txt'),
        `${req.method}___${req.url}___${Date.now()}___${error.name}___${
            error.message
        }\n`
    );

    res.status(error.status).json({
        // then returning internal server error
        status: error.status,
        message: 'Internal Server Error',
        data: null,
        token: null,
    });

    process.exit();
});

// @ts-ignore
app.listen(PORT, console.log(`I'm ready on http://localhost:${PORT}`));
