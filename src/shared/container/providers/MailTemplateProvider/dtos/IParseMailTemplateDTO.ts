interface ITemplateVariables {
  [key: string]: number | string;
}

export default interface IParseMailTemplateDTO {
  template: string;
  variables: ITemplateVariables;
}
