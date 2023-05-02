import { Injectable } from '@angular/core';
import { ArticleTemplatesService } from '../services/article-templates.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { IArticleTemplate } from '../interfaces/article-templates.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleTemplateResolver {

  constructor(private readonly articleTemplatesService: ArticleTemplatesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<never> | Observable<IArticleTemplate> {
    const id = route.params['id'];
    if(!id) {
      return EMPTY;
    }

    return this.articleTemplatesService.getTemplate(id).pipe(catchError(error => {
        return EMPTY;
      }), mergeMap(data => {
        if (data) {
          return of(data.data);
        } else {
          return EMPTY;
        }
      })
    );
  }
}
