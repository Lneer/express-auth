import jwt from "jsonwebtoken";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

class TokenService {
  generateToken(payload: object): Tokens {
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
  }

  saveToken(userId: string, refreshToken: string) {}
}

export default new TokenService();
