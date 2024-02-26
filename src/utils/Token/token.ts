import jwt from "jsonwebtoken";

export default class TokenValidation {

  static generateToken = ({ email, username }: { email: string, username: string }) => {
    const secret = process.env.NODE_ENV_JWT_SECRET_KEY!;
    const timeExpires = "5m";

    const payload = {
      email,
      username,
    };

    const options = {
      expiresIn: timeExpires,
    };

    return jwt.sign(payload, secret, options);
  };


  static validateToken(token: string) {
    const secret = process.env.NODE_ENV_JWT_SECRET_KEY!;

    return jwt.verify(token, secret);
  };
}

