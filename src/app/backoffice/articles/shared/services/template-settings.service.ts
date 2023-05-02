import { Injectable } from '@angular/core';
import { ITemplateSettings, } from '../interfaces';
import { RuleConfigBasic } from '../interfaces/rule-config-basic';
import { RuleConfigParameter } from '../interfaces/rule-config-parameter';
import { RuleConfigMinMaxBasic } from '../interfaces/rule-config-min-max-basic';
import { RuleConfigMinMaxSectionInstances } from '../interfaces/rule-config-min-max-section-instances';
import { RuleConfigPositionSections } from '../interfaces/rule-config-position-sections';

@Injectable({
  providedIn: 'root'
})
export class TemplateSettingsService  {

  private options: ITemplateSettings[] = [
    {
      description: 'Мин/Макс общ брой символи в статия (включва всички секции, без markup)',
      key: 'min_max_basic',
      config: new RuleConfigMinMaxBasic({ min: null, max: null }),
      rule: 'ToBeBetweenMinMax'
    },
    {
      description: 'Мин/Макс брой инстанции на секция, с име A|B|C ',
      key: 'min_max_section_instances',
      config: new RuleConfigMinMaxSectionInstances({
        names: null,
        expressions: null,
        min: null,
        max: null
      }),
      rule: 'ToHaveMinMaxEqualSections'
    },
    {
      description: 'Позиция на секция спрямо други секции',
      key: 'position_sections',
      config: new RuleConfigPositionSections({
        names: null,
        expressions: null
      }),
      rule: 'ToHavEqualSectionPositions'
    },
  ]

  constructor() {}

  getOptions(){
    return this.options;
  }

  getKeys(): object{
    return {
      ['max_article_characters'] : 'RuleConfigBasic',
      ['min_article_characters'] : 'RuleConfigBasic',
      ['max_section_instances'] : 'RuleConfigParameter',
      ['min_section_instances'] : 'RuleConfigParameter',
      ['min_max_basic'] : 'RuleConfigMinMaxBasic',
      ['min_max_section_instances'] : 'RuleConfigMinMaxSectionInstances',
      ['position_sections'] : 'RuleConfigPositionSections',
    }
  }
}
