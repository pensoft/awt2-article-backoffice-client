import { Injectable } from '@angular/core';
import { BaseService } from '@core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { IPagination, PaginationInputData } from '@core/interfaces/pagination.interface';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import {
  ArticleTemplateOutputAdapter,
  IArticleTemplate,
  IArticleTemplateOutputResult
} from '../interfaces/article-templates.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleTemplatesRepository extends BaseService {

  constructor(private http: HttpClient) {
    super()
  }

  getTemplates(filters: IPagination): Observable<PaginationInputData<IArticleTemplate>> {
    const queryParams: Params = this.setParameter(filters);
    return this.http.get<PaginationInputData<IArticleTemplate>>(
      `/articles/templates`,
      {params: queryParams}
    )
  }

  deleteTemplate(id: number): Observable<any>{
    return this.http.delete<any>(`/articles/templates/${id}`);
  }

  createTemplate(template:ArticleTemplateOutputAdapter): Observable<IArticleTemplateOutputResult>{
    return this.http.post<IArticleTemplateOutputResult>(`/articles/templates`, template)
  }

  updateTemplate(id: number, template: ArticleTemplateOutputAdapter): Observable<IArticleTemplateOutputResult>{
    return this.http.put<IArticleTemplateOutputResult>(`/articles/templates/${id}`, template);
  }

  getTemplate(id: number): Observable<IArticleTemplateOutputResult>{
    return this.http.get<IArticleTemplateOutputResult>(`/articles/templates/${id}`);
  }
}
