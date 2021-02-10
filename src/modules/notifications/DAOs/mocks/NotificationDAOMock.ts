import INotificationDTO from "@modules/notifications/dtos/INotificationDTO";
import { v4 } from "uuid";
import INotificationDAO from "../INotificationDAO";

type INotification = Assign<INotificationDTO, "_id", string>;

export default class NotificationDAOMock implements INotificationDAO {
  private notifications: INotification[] = [];

  async create(data: INotificationDTO): Promise<INotification> {
    const notification = {
      _id: v4(),
      ...data
    };
    this.notifications.push(notification);

    return notification;
  }
}
