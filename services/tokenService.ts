import jwt from "jsonwebtoken";

export class TokenService {
  constructor() {}

  public generateToken(payload: object) {
    return jwt.sign(payload, process.env.TOKEN_SECRET || "");
  }

  public verifyToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.TOKEN_SECRET || "", (err, decoded) => {
        err ? reject({}) : resolve(decoded);
      });
    });
  }
}
