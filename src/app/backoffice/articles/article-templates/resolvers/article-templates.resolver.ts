import { Injectable } from '@angular/core';
import { ArticleTemplatesService } from '../services/article-templates.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { ArticleTemplateListAdapter } from '../interfaces/article-templates.interface';
import { IPagination, PaginationAdapter } from '@core/interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleTemplatesResolver {

  public filters: IPagination = new PaginationAdapter({
    page: 1,
    pageSize: 999999
  });
  constructor(private readonly articleTemplatesService: ArticleTemplatesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<never> | Observable<ArticleTemplateListAdapter[]> {
    return this.articleTemplatesService.getTemplates(this.filters).pipe(catchError(error => {
        return EMPTY;
      }), mergeMap(result => {
        if (result) {
          const { data, meta: { pagination } } = result;
          const r = data.map(item => new ArticleTemplateListAdapter(item));
          return of(r);
        } else {
          return EMPTY;
        }
      })
    );
  }
}
