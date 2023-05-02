export interface IRuleConfigPositionSections {
  names: string;
  expressions: string;
}

export class RuleConfigPositionSections {
  names: string;
  expressions: string;

  constructor(item: Partial<IRuleConfigPositionSections>) {
    Object.assign(this, item);
  }
}
