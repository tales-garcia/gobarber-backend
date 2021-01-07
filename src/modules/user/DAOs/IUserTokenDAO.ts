import IUserTokenDTO from "../DTOs/IUserTokenDTO";

type IUserToken = Assign<IUserTokenDTO, "_id" | "token", string>;

export default interface IUserTokenDAO {
  generate(userId: string): Promise<IUserToken>;
  findByToken(token: string): Promise<IUserToken>;
}
