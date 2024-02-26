import { verify, decode, sign } from "jsonwebtoken";

export default class TokenValidation {

  static generateToken = ({ email, username }: { email: string, username: string }) => {
    const secret = process.env.NODE_ENV_JWT_SECRET_KEY!;
    const timeExpires = "2m";

    const payload = {
      email,
      username,
    };

    const options = {
      expiresIn: timeExpires,
    };

    return sign(payload, secret, options);
  };


  static validateToken(token: string) {
    const secret = process.env.NODE_ENV_JWT_SECRET_KEY!;

    return verify(token, secret);
  };
}

