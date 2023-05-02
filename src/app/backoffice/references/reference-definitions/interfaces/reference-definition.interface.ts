
export interface IReferenceDefinition {
  id: number;
  title: string;
  type: string;
  schema: any;
  settings: any;
}

export class ReferenceDefinitionAdapter {
  id = null;
  title = '';
  type = '';
  schema = {};
  settings = {};

  constructor(props? : IReferenceDefinition) {
    Object.assign(this, props)
  }
}



export interface IReferenceDefinitionOutputResult {
  data: IReferenceDefinition;
}
