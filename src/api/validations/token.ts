import jwt from "jsonwebtoken";

const secretKey = process.env.NODE_ENV_JWT_SECRET_KEY!;

export default class TokenValidation {
  static generateToken = ({ email, id }: { email?: string; id: string }) => {
    const payload = {
      email,
      id,
    };

    const options = { expiresIn: 60 * 60 };

    return jwt.sign(payload, secretKey, options);
  };

  static validateToken(token: string) {
    return jwt.verify(token, secretKey);
  }
}
