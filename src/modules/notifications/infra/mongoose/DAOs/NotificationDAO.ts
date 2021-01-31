import INotificationDAO from "@modules/notifications/DAOs/INotificationDAO";
import INotificationDTO from "@modules/notifications/dtos/INotificationDTO";
import Notification from "../schemas/notification";

type INotification = Assign<INotificationDTO, "_id", string>;

export default class NotificationDAO implements INotificationDAO {
  async create(data: INotificationDTO): Promise<INotification> {
    return await Notification.create(data) as unknown as INotification;
  }
}
