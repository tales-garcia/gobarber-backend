import IHashProvider from "../models/IHashProvider";

export default class HashProviderMock implements IHashProvider {
  async generateHash(payload: string) {
    return payload;
  }
  async compareHash(payload: string, hashed: string) {
    return payload === hashed;
  }
}
