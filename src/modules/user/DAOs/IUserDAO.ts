import IUserDTO from "../DTOs/IUserDTO";

export default interface IUserDAO {
  findByEmail(email: string): Promise<IUserDTO>;
  findByIdAndUpdate(_id: string, query: IUserDTO): Promise<IUserDTO>;
  create(user: object): Promise<Omit<IUserDTO, "password">>;
  findById(_id: string): Promise<IUserDTO>;
  find(filter?: object): Promise<Omit<IUserDTO, "password">[]>;
}
