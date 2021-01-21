import IFindDTO from "../DTOs/IFindDTO";
import IUserDTO from "../DTOs/IUserDTO";

type IUser = Assign<IUserDTO, "_id", string>;

export default interface IUserDAO {
  findByEmail(email: string): Promise<IUser>;
  findByIdAndUpdate(_id: string, query: OptionalKeys<IUser>): Promise<IUser>;
  create(user: IUserDTO): Promise<Omit<IUserDTO, "password">>;
  findById(_id: string): Promise<IUser>;
  find(data?: IFindDTO): Promise<Omit<IUser, "password">[]>;
}
