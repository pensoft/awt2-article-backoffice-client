import { IArticleTemplate } from '../../article-templates/interfaces/article-templates.interface';

export interface IArticle {
  id: number;
  uuid: string;
  user_id: number;
  template: IArticleTemplate;
}


export class ArticleListAdapter {
  id: number;
  uuid: string;
  user_id: number;
  template: IArticleTemplate;

  constructor(item: Partial<IArticle>) {
    Object.assign(this, item);
  }
}
