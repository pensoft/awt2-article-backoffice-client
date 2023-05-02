import { IArticleSection } from '../../article-sections/interfaces/article-sections.interface';
import { ITemplateSettings } from '../../shared/interfaces/template-rules.interface';

export interface IArticleTemplate {
  id: number;
  name: string;
  schema?: [];
  sections?: IArticleSection[],
  rules?: ITemplateSettings[],
  version?: number;
  version_id?: number;
  version_date?: string;
}


export class ArticleTemplateListAdapter {
  id: number;
  name: string;
  schema: [];
  rules?: ITemplateSettings[];
  version: number;
  version_id: number;
  version_date: string;
  created_at: Date;

  constructor(item: Partial<IArticleTemplate>) {
    Object.assign(this, item)
  }
}

export class ArticleTemplateOutputAdapter {
  id?: number;
  name: string;
  schema: [];

  constructor(item: Partial<IArticleTemplate>) {
    Object.assign(this, item)
  }
}

export interface IArticleTemplateOutputResult {
  data: IArticleTemplate;
}
