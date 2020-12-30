import IUserDTO from "../DTOs/IUserDTO";

export default interface IUserDAO {
  findByEmail(email: string): Promise<IUserDTO>;
  findByIdAndUpdate(id: string, query: IUserDTO): Promise<IUserDTO>;
  create(user: object): Promise<Omit<IUserDTO, "password">>;
  findById(id: string): Promise<IUserDTO>;
  find(filter?: object): Promise<Omit<IUserDTO, "password">[]>;
}
