import { container } from "tsyringe";
import HandleBarsMailTemplateProvider from "./implementations/HandleBarsMailTemplateProvider";
import IMailTemplateProvider from "./models/IMailTemplateProvider";

container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandleBarsMailTemplateProvider);
