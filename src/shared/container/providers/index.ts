import { container } from "tsyringe";
import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";
import IStorageProvider from "./StorageProvider/models/IStorageProvider";
import IMailProvider from "./MailProvider/models/IMailProvider";
import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IMailProvider>('MailProvider', EtherealMailProvider);
container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);
