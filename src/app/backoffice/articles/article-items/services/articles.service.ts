import { Injectable } from '@angular/core';
import { ArticlesRepository } from '../repositories/articles.repository';
import { IPagination, PaginationInputData } from '@core/interfaces/pagination.interface';
import { Observable } from 'rxjs';
import { IArticle } from '../interfaces/articles.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private readonly articlesRepository: ArticlesRepository) { }

  getArticles(filters: IPagination): Observable<PaginationInputData<IArticle>>{
    return this.articlesRepository.getArticles(filters);
  }

  deleteArticle(id: number): Observable<any> {
    return this.articlesRepository.deleteArticle(id);
  }
}
