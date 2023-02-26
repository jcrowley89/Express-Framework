import { Injectable } from "../lib/di/injectable";
import User from "../models/User";
import UserRepository from "../repositories/userRepository";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public getAllUsers() {
    const { userRepository } = this;
    const users = userRepository.getAllUsers();
    return users;
  }

  public getUser(id: number) {
    const { userRepository } = this;
    const user = userRepository.getUser(id);
    return user;
  }

  public saveUser(user: User) {
    const { userRepository } = this;
    const _user = userRepository.saveUser(user);
    return _user;
  }

  public deleteUser(id: number) {
    const { userRepository } = this;
    const users = userRepository.deleteUser(id);
    return users;
  }
}
