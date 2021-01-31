import INotificationDTO from "@modules/notifications/dtos/INotificationDTO";
import { uuid } from "uuidv4";
import INotificationDAO from "../INotificationDAO";

type INotification = Assign<INotificationDTO, "_id", string>;

export default class NotificationDAOMock implements INotificationDAO {
  private notifications: INotification[] = [];

  async create(data: INotificationDTO): Promise<INotification> {
    const notification = {
      _id: uuid(),
      ...data
    };
    this.notifications.push(notification);

    return notification;
  }
}
