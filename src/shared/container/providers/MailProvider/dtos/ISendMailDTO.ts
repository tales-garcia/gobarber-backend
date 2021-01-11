import IParseMailTemplateDTO from "../../MailTemplateProvider/dtos/IParseMailTemplateDTO";

interface IAddress {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IAddress;
  from?: IAddress;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
