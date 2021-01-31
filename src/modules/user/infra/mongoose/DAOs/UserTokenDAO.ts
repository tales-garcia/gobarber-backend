import IUserTokenDAO from "@modules/user/DAOs/IUserTokenDAO";
import IUserTokenDtO from "@modules/user/DTOs/IUserTokenDTO";
import { uuid } from "uuidv4";
import UserToken from "../schemas/userToken"

type TUserToken = Assign<Assign<IUserTokenDtO, "_id" | "token", string>, "createdAt" | "updatedAt", Date>;

export default class UserTokenDAO implements IUserTokenDAO {
  async generate(userId: string): Promise<TUserToken> {
    return await UserToken.create({
      userId,
      token: uuid()
    }) as unknown as TUserToken;
  }
  async findByToken(token: string): Promise<TUserToken> {
    return await UserToken.findOne({ token }) as unknown as TUserToken;
  }
}
