import { Injectable } from '@angular/core';
import { BaseService } from '@core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ArticleSectionOutputAdapter,
  IArticleSection,
  IArticleSectionOutputResult
} from '../interfaces/article-sections.interface';
import { IPagination, PaginationInputData } from '@core/interfaces/pagination.interface';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticleSectionsRepository extends BaseService{

  constructor(private http: HttpClient) {
    super()
  }

  getSections(filters: IPagination): Observable<PaginationInputData<IArticleSection>>{
    const queryParams: Params = this.setParameter(filters);
    return this.http.get<PaginationInputData<IArticleSection>>(`/articles/sections`, { params: queryParams })
  }

  getSection(id: number, options = {}): Observable<IArticleSectionOutputResult> {
    return this.http.get<IArticleSectionOutputResult>(`/articles/sections/${id}`, options);
  }

  exportSection(id: number, options = {}): Observable<IArticleSectionOutputResult> {
    return this.http.get<IArticleSectionOutputResult>(`/articles/sections/${id}/export`, options);
  }

  createSection(section: ArticleSectionOutputAdapter): Observable<IArticleSectionOutputResult>{
    return this.http.post<IArticleSectionOutputResult>(`/articles/sections`, section)
  }

  updateSection(id: number, section: ArticleSectionOutputAdapter): Observable<IArticleSectionOutputResult>{
    return this.http.put<IArticleSectionOutputResult>(`/articles/sections/${id}`, section)
  }

  deleteSection(id: number): Observable<any>{
    return this.http.delete<any>(`/articles/sections/${id}`);
  }

  importSections(data): Observable<any> {
    return this.http.post<any>(`/articles/sections/import`, data);
  }

  uploadMedia(data): Observable<any> {
    return this.http.post<any>(`/cdn/v1/upload`, data);
  }
}
