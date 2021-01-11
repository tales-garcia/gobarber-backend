import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplateProvider from "../models/IMailTemplateProvider";

export default class MailTemplateProviderMock implements IMailTemplateProvider {
  async parse({ template }: IParseMailTemplateDTO) {
    return template;
  }
}
