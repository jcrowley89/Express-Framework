import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import { TokenService } from "../../services/tokenService";
import { Injectable } from "../di/injectable";

@Injectable()
export class AuthorizeMiddleware {
  constructor(private tokenService: TokenService) {}

  public apply() {
    return (policies: string[]) =>
      async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (token == null) return res.sendStatus(401);

        const user = await this.tokenService.verifyToken(token);

        if (!user) return res.sendStatus(401);
        let hasRoles = true;
        policies.forEach((p) => {
          if (!(user as User).roles.includes(p)) {
            hasRoles = false;
          }
        });
        if (!hasRoles) return res.sendStatus(401);
        else (req as any).user = user;
        next();
      };
  }
}
