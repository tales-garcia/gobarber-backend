import { compare, hash } from "bcrypt";
import IHashProvider from "../models/IHashProvider";

export default class BCryptHashProvider implements IHashProvider {
  async generateHash(payload: string) {
    return await hash(payload, 8);
  }
  async compareHash(payload: string, hashed: string) {
    return await compare(payload, hashed);
  }

}
