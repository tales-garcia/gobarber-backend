import { container } from "tsyringe";
import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";
import IStorageProvider from "./StorageProvider/models/IStorageProvider";
import IMailProvider from "./MailProvider/models/IMailProvider";
import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";
import HandleBarsMailTemplateProvider from "./MailTemplateProvider/implementations/HandleBarsMailTemplateProvider";
import IMailTemplateProvider from "./MailTemplateProvider/models/IMailTemplateProvider";

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);
container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandleBarsMailTemplateProvider);
container.registerInstance<IMailProvider>('MailProvider', container.resolve(EtherealMailProvider));
