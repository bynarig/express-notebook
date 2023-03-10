import dotenv from 'dotenv';
dotenv.config();
import JWT, { JwtPayload } from 'jsonwebtoken';

//@ts-ignore
const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET;
//@ts-ignore
const JWT_ACCESS_SECRET: string = process.env.JWT_ACCESS_SECRET;

export default {
    sign: (payload: JwtPayload) =>
        JWT.sign(payload, JWT_REFRESH_SECRET, {
            expiresIn: process.env.JWT_EXP,
        }),
    refresh: (payload: JwtPayload) =>
        JWT.sign(payload, JWT_REFRESH_SECRET, {
            expiresIn: process.env.JWT_EXP_REFRESH,
        }),
    verifyAccess: (token: string) => JWT.verify(token, JWT_ACCESS_SECRET),
    verifyRefresh: (token: string) => JWT.verify(token, JWT_ACCESS_SECRET),
};
