import { IRuleConfigBasic } from './rule-config-basic';

export interface IRuleConfigParameter extends IRuleConfigBasic {
  amount?: number;
  parameterName?: string;
}

export class RuleConfigParameter {
  value: string;
  amount: number;
  parameterName: string;

  constructor(item: Partial<IRuleConfigParameter>) {
    Object.assign(this, item);
  }
}
