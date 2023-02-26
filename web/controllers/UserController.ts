import { Request, Response } from "express";
import Authorize from "../../lib/decorators/authorizeDecorator";
import Controller from "../../lib/decorators/controllerDecorator";
import { Get, Post, Delete } from "../../lib/decorators/routeDecorators";
import { Injectable } from "../../lib/di/injectable";
import { UserService } from "../../services/userService";

@Controller("/user")
@Injectable()
@Authorize(["admin"])
export default class UserController {
  constructor(private userService: UserService) {}

  @Get("/")
  public getAllUsers(req: Request, res: Response) {
    const { userService } = this;
    const users = userService.getAllUsers();
    return res.json(users);
  }

  @Get("/:id")
  public getUser(req: Request, res: Response) {
    const { userService } = this;
    const id = Number(req.params.id);
    const users = userService.getUser(id);
    return res.json(users);
  }

  @Post("/save")
  public saveUser(req: Request, res: Response) {
    const { userService } = this;
    const user = req.body;
    const _user = userService.saveUser(user);
    return res.json(_user);
  }

  @Delete("/:id")
  public deleteUser(req: Request, res: Response) {
    const { userService } = this;
    const id = Number(req.params.id);
    const users = userService.deleteUser(id);
    return res.json(users);
  }
}
