interface ITemplateVariables {
  [key: string]: number | string;
}

export default interface IParseMailTemplateDTO {
  file: any;
  variables: ITemplateVariables;
}
