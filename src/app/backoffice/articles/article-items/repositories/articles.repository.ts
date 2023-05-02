import { Injectable } from '@angular/core';
import { BaseService } from '@core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { IPagination, PaginationInputData } from '@core/interfaces/pagination.interface';
import { Observable } from 'rxjs';
import { IArticle } from '../interfaces/articles.interface';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticlesRepository extends BaseService {

  constructor(private http: HttpClient) {
    super()
  }

  getArticles(filters: IPagination): Observable<PaginationInputData<IArticle>>{
    const queryParams: Params = this.setParameter(filters);
    return this.http.get<PaginationInputData<IArticle>>(
      `/articles/items?filtered=false`,
      {params: queryParams}
    )
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete<any>(`/articles/items/${id}`)
  }
}
