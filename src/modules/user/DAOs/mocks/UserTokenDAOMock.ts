import IUserTokenDTO from "@modules/user/DTOs/IUserTokenDTO";
import { uuid } from "uuidv4";
import IUserTokenDAO from "../IUserTokenDAO";

type IUserToken = Assign<IUserTokenDTO, "_id" & "token", string>;

export default class UserTokenDAOMock implements IUserTokenDAO {
  private tokens: IUserToken[] = [];

  async generate(userId: string) {
    const token = {
      userId,
      _id: uuid(),
      token: uuid()
    };

    this.tokens.push(token);

    return token;
  }
}
