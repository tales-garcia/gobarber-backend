interface ITemplateVariables {
  [key: string]: number | string;
}

export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
