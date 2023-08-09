import jwt from "jsonwebtoken";
import { TokenType, Tokens } from "../types/types";
import tokenRepository from "../models/token.model";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const ACCESS_TOKEN_LIFE = process.env.ACCESS_TOKEN_LIFE;
const REFRESH_TOKEN_LIFE = process.env.REFRESH_TOKEN_LIFE;

class TokenService {
  generate = (payload: object): Tokens => {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: ACCESS_TOKEN_LIFE,
    });

    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_LIFE,
    });

    return { accessToken, refreshToken };
  };

  async save(userId: string, refreshToken: string) {
    const tokenData = await tokenRepository.findOne({
      key: "userId",
      value: userId,
    });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenRepository.save(tokenData);
    }
    return tokenRepository.save({ userId, refreshToken });
  }

  async remove(refreshToken: string) {
    const tokenData = (await tokenRepository.findOne({
      key: "refreshToken",
      value: refreshToken,
    })) as unknown as { userId: string; refreshToken: string | null };
    if (!tokenData) {
      return null;
    }
    tokenData.refreshToken = null;
    tokenRepository.save({ ...tokenData });
  }

  async validateToken(tokenType: TokenType, token: string) {
    try {
      if (tokenType === "accessToken") {
        jwt.verify(token, JWT_ACCESS_SECRET);
      }
      if (tokenType === "refreshToken") {
        jwt.verify(token, JWT_REFRESH_SECRET);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async check(token: string, secret: string): Promise<boolean> {
    try {
      jwt.verify(token, secret);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new TokenService();
