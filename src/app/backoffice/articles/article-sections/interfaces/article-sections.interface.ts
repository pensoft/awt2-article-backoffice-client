import { ArticleSectionTypes } from '../enums/article-section-types';

export interface ISectionCompatibility {
  allow: ISectionCompatibilityUnit;
  deny: ISectionCompatibilityUnit;
}

export interface ISectionCompatibilityUnit {
  all: boolean;
  values: number[];
}

export interface IArticleSection {
  id: number;
  name: string;
  label: string;
  schema: [];
  sections: [];
  template: string;
  type: ArticleSectionTypes,
  version_id?: number;
  pivot_id?: number;
  index?: number;
  version?: number | string;
  version_date?: string;
  settings?: any;
  complex_section_settings?: any;
  compatibility?: ISectionCompatibility;
  allow_compatibility?: boolean;
  section_version?: number;
  version_pre_defined?: boolean;
}

export class ArticleSectionOutputAdapter {
  id?: number;
  name: string;
  schema: [];
  sections: [];
  template: string;
  type: ArticleSectionTypes;
  version_id: number;

  constructor(item: Partial<IArticleSection>) {
    console.log(item);
    (item.sections || []).forEach((section: IArticleSection, index) => {
      item.complex_section_settings = [
        ...item.complex_section_settings || [],
        ...(section.settings && Object.entries(section.settings).length !== 0 ? [{...section.settings, section_id: section.id, pivot_id: section.pivot_id, version_id: section.version_id, index}] : []),
      ]
      section.settings = undefined;
      delete section.settings;
    })
    Object.assign(this, {
      ...item,
      complex_section_settings: (item.complex_section_settings || []).filter(s => s && Object.entries(s).length !== 0)
    })
  }
}

export interface IArticleSectionsData {
  data: IArticleSection[]
}

export interface IArticleSectionOutputResult {
  data: IArticleSection
}


export class ArticleSectionListAdapter {
  id: number;
  name: string;
  label: string;
  schema: [];
  sections: [];
  template: string;
  type: ArticleSectionTypes
  created_at: Date;
  version_id: number;
  pivot_id: number;
  version: number | string;
  version_pre_defined: boolean;
  version_date: string;
  section_version: number;
  complex_section_settings = null;
  settings = null;

  constructor(item: Partial<IArticleSection>) {
    item.complex_section_settings && (item.sections || []).forEach((section: IArticleSection, index) => {
      section.settings = item.complex_section_settings.find(item => /*item.version_id === section.version_id &&*/ item.index === index);

    });
    delete item.complex_section_settings;
    Object.assign(this, {
      ...item
    })
  }
}


export class ArticleSectionAdapter {
  compatibility: ISectionCompatibility;
  id: number;
  name: string;
  label: string;
  schema: [];
  sections: [];
  section_version: number;
  complex_section_settings: any;
  template: string;
  type: ArticleSectionTypes;
  version: number | string;
  version_date: string;
  version_id: number;
  version_pre_defined: boolean;

  constructor(item: Partial<IArticleSection>) {
    item.complex_section_settings && item.schema && item.sections.forEach((section: IArticleSection, index) => {
      section.settings = item.complex_section_settings.find(item => /*item.version_id === section.version_id &&*/ item.index === index);

    })
    Object.assign(this, {
      ...item,
      complex_section_settings: undefined
    })
  }
}
