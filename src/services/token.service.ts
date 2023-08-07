import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET = "123";
const JWT_REFRESH_SECRET = "321";

const ACCESS_TOKEN_LIFE = "30m";
const REFRESH_TOKEN_LIFE = "60m";

class TokenService {
  generateToken(payload: object): object {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: ACCESS_TOKEN_LIFE,
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_LIFE,
    });

    return { accessToken, refreshToken };
  }

  saveToken(userId: string, refreshToken: string) {}
}
