import bcrypt from "bcrypt";

const SALT = Number(process.env.SALT) || 2;

class PasswordService {
  async hash(password: string) {
    return await bcrypt.hash(password, SALT);
  }

  async compare(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export const passwordService = new PasswordService();
