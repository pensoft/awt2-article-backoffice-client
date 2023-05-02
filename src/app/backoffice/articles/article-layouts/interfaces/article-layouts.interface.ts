import { ITemplateSettings } from '../../shared/interfaces';
import { IArticleTemplate } from '../../article-templates/interfaces/article-templates.interface';
import { CitationStyleAdapter, ICitationStyle } from '../../shared/interfaces/citation-style.interface';

export interface IArticleLayout {
  id: number;
  name: string;
  rules?: ITemplateSettings[];
  article_template_id: number;
  schema_settings: object;
  version: number;
  version_id: number;
  version_date: string;
  created_at: Date;
  template?: IArticleTemplate;
  citation_style?: CitationStyleAdapter;
  template_version?: number;
}

export class ArticleLayoutAdapter {
  id: number;
  name: string;
  rules?: ITemplateSettings[];
  article_template_id: number;
  schema_settings: object;
  version: number;
  version_id: number;
  version_date: string;
  template: IArticleTemplate;
  created_at: Date;

  constructor(item: Partial<IArticleLayout>) {
    Object.assign(this, item)
  }
}

export class ArticleLayoutOutput {
  id?: number;
  name: string;
  rules: ITemplateSettings[];
  schema_settings: object;
  article_template_id: number;

  constructor(item: Partial<IArticleLayout>) {
    Object.assign(this, item)
  }
}


export interface IArticleLayoutData {
  data: IArticleLayout
}
