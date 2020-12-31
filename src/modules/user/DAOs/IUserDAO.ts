import IUserDTO from "../DTOs/IUserDTO";

export default interface IUserDAO {
  findByEmail(email: string): Promise<IUserDTO>;
  findByIdAndUpdate(_id: string, query: OptionalKeys<IUserDTO>): Promise<IUserDTO>;
  create(user: IUserDTO): Promise<Omit<IUserDTO, "password">>;
  findById(_id: string): Promise<IUserDTO>;
  find(filter?: OptionalKeys<Omit<IUserDTO, "password">>): Promise<Omit<IUserDTO, "password">[]>;
}
