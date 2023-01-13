import bcrypt from 'bcrypt';
import tokenService from './token.service.js';
import UserDto from '../dtos/user.dto.js';
import JWT from '../utils/jwt.js';
import { ValidationError, NotFoundError } from '../utils/errors.js';
import UserModel from '../models/auth/user.model.js';
import TokenModel from '../models/auth/token.model.js';
import { JwtPayload } from 'jsonwebtoken';
import userModel from '../models/auth/user.model.js';

class UserService {
    // register
    async register(email: string, password: string, username: string) {
        try {
            // const person = await userModel.findOne({email});
            // if (person) {
            //     throw new ValidationError(400, 'This user is exist');
            // }
            console.log(email, password, username);
        } catch (error) {
            throw error;
        }
    }
    // login
    async login(
        email: string,
        password: string,
        userModel: typeof UserModel,
        tokenModel: typeof TokenModel
    ) {
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                throw new NotFoundError(400, 'The user is not found');
            }

            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                throw new ValidationError(400, 'Code does not match');
            }
            const userDto = new UserDto(user);
            const tokens = {
                accesToken: JWT.sign({ ...userDto }),
                refreshToken: JWT.refresh({ ...userDto }),
            };
            await tokenService.saveToken(
                userDto.id,
                tokens.refreshToken,
                tokenModel
            );
            return { ...tokens, userDto };
        } catch (error) {
            throw error;
        }
    }

    // logout
    async logout(refreshToken: string, tokenModel: typeof TokenModel) {
        const token = await tokenService.removeToken(refreshToken, tokenModel);
        return token;
    }

    async refresh(
        refreshToken: string,
        tokenModel: typeof TokenModel,
        userModel: typeof UserModel
    ) {
        if (!refreshToken) {
            throw new NotFoundError(400, 'The user is not found');
        }
        //@ts-ignore
        const validToken: JwtPayload =
            tokenService.validateRefreshToken(refreshToken);
        const findTokenInDb = await tokenService.findToken(
            refreshToken,
            tokenModel
        );
        if (!validToken || !findTokenInDb) {
            throw new NotFoundError(400, 'The user is not found');
        }
        const user = await userModel.findById(validToken.id);
        const userDto = new UserDto(user);
        const tokens = {
            accesToken: JWT.sign({ ...userDto }),
            refreshToken: JWT.refresh({ ...userDto }),
        };
        await tokenService.saveToken(
            userDto.id,
            tokens.refreshToken,
            tokenModel
        );
        return { ...tokens, userDto };
    }
}

export default new UserService();
