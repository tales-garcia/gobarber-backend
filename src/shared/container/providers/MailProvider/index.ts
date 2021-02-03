import { container } from "tsyringe";
import EtherealMailProvider from "./implementations/EtherealMailProvider";
import SESMailProvider from "./implementations/SESMailProvider";
import IMailProvider from "./models/IMailProvider";
import mailConfig from '@config/mail';

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider)
}

container.registerInstance<IMailProvider>('MailProvider', mailProvider[mailConfig.driver]);
