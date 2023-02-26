import bcrypt from "bcrypt";

export class CipherService {
  constructor() {}

  public async hash(input: string) {
    const hash = await bcrypt.hash(input, 10);
    return hash;
  }

  public async compare(input: string, hash: string) {
    const result = await bcrypt.compare(input, hash);
    return result;
  }
}
