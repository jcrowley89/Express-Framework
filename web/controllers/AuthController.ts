import { Request, Response } from "express";
import Controller from "../../lib/decorators/controllerDecorator";
import { Get, Post } from "../../lib/decorators/routeDecorators";
import { Injectable } from "../../lib/di/injectable";
import { CipherService } from "../../services/cipherService";
import { TokenService } from "../../services/tokenService";
import { UserService } from "../../services/userService";

@Controller("/auth")
@Injectable()
export default class AuthController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private cipherService: CipherService
  ) {}

  @Post("/login")
  public async login(req: Request, res: Response) {
    const { userService, cipherService, tokenService } = this;
    const { email, password } = req.body;
    const user = userService.getAllUsers().find((u) => u.email === email);
    const success = await cipherService.compare(password, user?.password || "");
    if (!success) return res.status(401).end();
    const token = tokenService.generateToken(user || {});
    res.json(token).end();
    return;
  }

  @Post("/register")
  public async register(req: Request, res: Response) {
    const { userService, cipherService } = this;
    const { email, password, roles } = req.body;
    const hashedPwd = await cipherService.hash(password);
    const user = userService.saveUser({
      email,
      password: hashedPwd,
      roles,
    });
    res.json({ ...user, password: undefined });
    return;
  }
}
