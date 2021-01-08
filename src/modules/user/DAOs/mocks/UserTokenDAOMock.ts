import IUserTokenDTO from "@modules/user/DTOs/IUserTokenDTO";
import { uuid } from "uuidv4";
import IUserTokenDAO from "../IUserTokenDAO";

type IUserToken = Assign<Assign<IUserTokenDTO, "_id" | "token", string>, "createdAt" | "updatedAt", Date>;

export default class UserTokenDAOMock implements IUserTokenDAO {
  private tokens: IUserToken[] = [];

  async generate(userId: string) {
    const token = {
      userId,
      _id: uuid(),
      token: uuid(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.tokens.push(token);

    return token;
  }
  findOne(filter: OptionalKeys<IUserToken>) {
    const keys = Object.keys(filter);

    return this.tokens.find(userToken => {
      const results = keys.map(key => userToken[key] === filter[key]);

      return !results.some(result => !result);
    });
  }
  async findByToken(token: string) {
    return this.findOne({ token });
  }
}
