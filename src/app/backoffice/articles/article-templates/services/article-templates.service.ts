import { Injectable } from '@angular/core';
import { ArticleTemplatesRepository } from '../repositories/article-templates.repository';
import { IPagination, PaginationInputData } from '@core/interfaces/pagination.interface';
import { Observable } from 'rxjs';
import {
  ArticleTemplateOutputAdapter,
  IArticleTemplate,
  IArticleTemplateOutputResult
} from '../interfaces/article-templates.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleTemplatesService {

  constructor(private readonly articleTemplatesRepository: ArticleTemplatesRepository) { }

  getTemplates(filters: IPagination): Observable<PaginationInputData<IArticleTemplate>> {
    return this.articleTemplatesRepository.getTemplates(filters);
  }

  deleteTemplate(id: number): Observable<any> {
    return this.articleTemplatesRepository.deleteTemplate(id);
  }

  getTemplate(id: number): Observable<IArticleTemplateOutputResult>{
    return this.articleTemplatesRepository.getTemplate(id);
  }

  createTemplate(template: ArticleTemplateOutputAdapter): Observable<IArticleTemplateOutputResult>{
    return this.articleTemplatesRepository.createTemplate(template);
  }

  updateTemplate(id: number, template: ArticleTemplateOutputAdapter): Observable<IArticleTemplateOutputResult>{
    return this.articleTemplatesRepository.updateTemplate(id, template);
  }
}
