import { Injectable } from '@angular/core';
import { BaseService } from '@core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { IPagination, PaginationInputData } from '@core/interfaces/pagination.interface';
import { Observable } from 'rxjs';
import { ArticleLayoutOutput, IArticleLayout, IArticleLayoutData } from '../interfaces/article-layouts.interface';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticleLayoutsRepository extends BaseService {

  constructor(private http: HttpClient) {
    super()
  }

  getLayouts(filters: IPagination): Observable<PaginationInputData<IArticleLayout>> {
    const queryParams: Params = this.setParameter(filters);
    return this.http.get<PaginationInputData<IArticleLayout>>(
      `/layouts`,
      { params: queryParams}
    )
  }

  deleteLayout(id: number): Observable<any>{
    return this.http.delete<any>(`/layouts/${id}`);
  }

  getLayout(id: number): Observable<IArticleLayoutData> {
    return this.http.get<IArticleLayoutData>(`/layouts/withoutTransform/${id}`);
  }

  createLayout(layout: ArticleLayoutOutput): Observable<IArticleLayoutData> {
    return this.http.post<IArticleLayoutData>(`/layouts`, layout)
  }

  updateLayout(id: number, layout: ArticleLayoutOutput): Observable<IArticleLayoutData> {
    return this.http.put<IArticleLayoutData>(`/layouts/${id}`, layout)
  }
}
