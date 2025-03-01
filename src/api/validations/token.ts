import { verify, decode, sign } from "jsonwebtoken";

export default class TokenValidation {
  static generateToken = ({ email, name }: { email: string; name: string }) => {
    const secret = process.env.NODE_ENV_JWT_SECRET_KEY!;
    const timeExpires = "10m";

    const payload = {
      email,
      name,
    };

    const options = {
      expiresIn: timeExpires,
    };

    return sign(payload, secret, options);
  };

  static validateToken(token: string) {
    const secret = process.env.NODE_ENV_JWT_SECRET_KEY!;

    return verify(token, secret);
  }
}
