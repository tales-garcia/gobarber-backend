import IUserDTO from "./IUserDTO";

type IUser = Assign<IUserDTO, "_id", string>;

export default interface IFindDTO {
  excludeId?: string;
  filter?: OptionalKeys<Omit<IUser, "password">>;
}
