import { Injectable } from '@angular/core';
import { ArticleLayoutsRepository } from '../repositories/article-layouts.repository';
import { IPagination, PaginationInputData } from '@core/interfaces/pagination.interface';
import { Observable } from 'rxjs';
import { ArticleLayoutOutput, IArticleLayout, IArticleLayoutData } from '../interfaces/article-layouts.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleLayoutsService {

  constructor(private readonly articleLayoutsRepository: ArticleLayoutsRepository) { }

  getLayouts(filters: IPagination): Observable<PaginationInputData<IArticleLayout>> {
    return this.articleLayoutsRepository.getLayouts(filters);
  }

  deleteLayouts(id: number): Observable<any> {
    return this.articleLayoutsRepository.deleteLayout(id);
  }

  getLayout(id: number): Observable<IArticleLayoutData>{
    return this.articleLayoutsRepository.getLayout(id);
  }

  createLayout(layout: ArticleLayoutOutput): Observable<IArticleLayoutData>{
    return this.articleLayoutsRepository.createLayout(layout);
  }

  updateLayout(id: number, layout: ArticleLayoutOutput): Observable<IArticleLayoutData>{
    return this.articleLayoutsRepository.updateLayout(id, layout);
  }
}
