interface Entity {
  id?: number;
}

export default interface User extends Entity {
  email: string;
  password?: string;
  roles: string[];
}
