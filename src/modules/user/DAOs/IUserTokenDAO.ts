import IUserTokenDTO from "../DTOs/IUserTokenDTO";

type IUserToken = Assign<Assign<IUserTokenDTO, "_id" | "token", string>, "createdAt" | "updatedAt", Date>;

export default interface IUserTokenDAO {
  generate(userId: string): Promise<IUserToken>;
  findByToken(token: string): Promise<IUserToken>;
}
