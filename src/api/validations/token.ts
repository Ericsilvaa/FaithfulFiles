import jwt from "jsonwebtoken";

const secretKey = process.env.NODE_ENV_JWT_SECRET_KEY! || "defaultSecret";

export default class TokenValidation {
  static generateToken = ({ email, name }: { email: string; name: string }) => {
    const payload = {
      email,
      name,
    };

    const options = { expiresIn: 60 * 60 };

    return jwt.sign(payload, secretKey, options);
  };

  static validateToken(token: string) {
    return jwt.verify(token, secretKey);
  }
}
