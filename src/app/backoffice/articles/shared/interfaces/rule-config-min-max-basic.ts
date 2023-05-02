export interface IRuleConfigMinMaxArticleCharacter {
  min?: number;
  max?: number;
}

export class RuleConfigMinMaxBasic {
  min: null;
  max: null;

  constructor(item: Partial<IRuleConfigMinMaxArticleCharacter>) {
    Object.assign(this, item);
  }
}
