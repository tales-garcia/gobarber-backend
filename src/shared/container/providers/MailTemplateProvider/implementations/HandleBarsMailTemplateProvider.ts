import handlebars from 'handlebars';

import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplateProvider from "../models/IMailTemplateProvider";

export default class HandleBarsMailTemplateProvider implements IMailTemplateProvider {
  async parse({ template, variables }: IParseMailTemplateDTO) {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
