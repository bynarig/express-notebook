import jwt from '../utils/jwt.js';
import TokenModel from '../models/auth/token.model';
class TokenService {
    async saveToken(
        userID: string,
        refreshToken: string,
        tokenModel: typeof TokenModel
    ) {
        const checkToken = await tokenModel.findOne({ user: userID });
        if (checkToken) {
            checkToken.refreshToken = refreshToken;
        }
        return await tokenModel.create({ user: userID, refreshToken });
    }
    async removeToken(refreshToken: string, tokenModel: typeof TokenModel) {
        return tokenModel.deleteOne({ refreshToken });
    }
    async findToken(token: string, model: typeof TokenModel) {
        return model.findOne({ token });
    }
    validateRefreshToken(token: string) {
        try {
            return jwt.verifyRefresh(token);
        } catch (err) {
            return null;
        }
    }
    validateAccessToken(token: string) {
        try {
            return jwt.verifyAccess(token);
        } catch (err) {
            return null;
        }
    }
}

export default new TokenService();
