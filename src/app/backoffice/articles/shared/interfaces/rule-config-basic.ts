export interface IRuleConfigBasic{
  value: number | string;
}

export class RuleConfigBasic {
  value: number | string;

  constructor(item: Partial<IRuleConfigBasic>) {
    Object.assign(this, item);
  }
}
