export enum ITemplateSettingsRule {
  'ToBeMoreOrEqualThan',
  'ToBeLessOrEqualThan',
  'ToHaveMoreOrEqualSections',
  'ToHaveLessOrEqualSections',
  'ToBeBetweenMinMax',
  'ToHaveMinMaxEqualSections',
  'ToHavEqualSectionPositions'
}

export enum ITemplateSettingsKey {
  'min_article_characters',
  'max_article_characters',
  'min_section_instances',
  'max_section_instances',
  'min_max_basic',
  'min_max_section_instances',
  'position_sections'
}

type ITemplateSettingsRuleStrings = keyof typeof ITemplateSettingsRule;
type ITemplateSettingsKeyStrings = keyof typeof ITemplateSettingsKey;

export interface ITemplateSettings {
  description: string;
  key: ITemplateSettingsKeyStrings;
  config: any;
  rule: ITemplateSettingsRuleStrings;
  id?: string;
}

export const ConfigTypeEnum = [
  'RuleConfigBasic',
  'RuleConfigParameter',
  'RuleConfigMinMaxBasic',
  'RuleConfigMinMaxSectionInstances',
  'RuleConfigPositionSections'
]

export class ArticleTemplateSettingsConfigDto {
  control: any;
}
