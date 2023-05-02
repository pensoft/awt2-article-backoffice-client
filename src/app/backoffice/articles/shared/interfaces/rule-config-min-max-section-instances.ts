export interface IRuleConfigMinMaxSectionInstances {
  min: number;
  max: number;
  names: string;
  expressions: string;
}

export class RuleConfigMinMaxSectionInstances {
  min: null;
  max: null;
  names: string;
  expressions: string;

  constructor(item: Partial<IRuleConfigMinMaxSectionInstances>) {
    Object.assign(this, item);
  }
}
