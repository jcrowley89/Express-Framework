import User from "../models/User";

export default class UserRepository {
  private _users: User[] = [];
  private _seq: number = 0;

  public getAllUsers(): User[] {
    return this._users;
  }

  public getUser(id: number) {
    return this._users.find((u) => u.id === id);
  }

  public saveUser(user: User) {
    this._users = [...this._users, { ...user, id: this._seq }];
    const _user = this.getUser(this._seq);
    this._seq++;
    return _user;
  }

  public deleteUser(id: number) {
    this._users = this._users.filter(u => u.id !== id);
    return this._users;
  }
}
