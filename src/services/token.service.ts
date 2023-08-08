import jwt from "jsonwebtoken";
import store from "./store.service";
interface Tokens {
  accessToken: string;
  refreshToken: string;
}

class TokenService {
  generate = (payload: object): Tokens => {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
      }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: process.env.REFRESH_TOKEN_LIFE,
      }
    );

    return { accessToken, refreshToken };
  };

  save = async (userId: string, refreshToken: string) => {
    const findToken = await store.findOne(store.tokenRepository, {
      key: "userId",
      value: userId,
    });
    if (findToken) {
      findToken.refreshToken = refreshToken;
      return store.create(store.tokenRepository, findToken);
    }
    return store.create(store.tokenRepository, { userId, refreshToken });
  };

  check(token: string, secret: string): boolean {
    try {
      jwt.verify(token, secret);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new TokenService();
