import INotificationDTO from "../dtos/INotificationDTO";

type INotification = Assign<INotificationDTO, "_id", string>;

export default interface INotificationDAO {
  create(data: INotificationDTO) : Promise<INotification>
}
