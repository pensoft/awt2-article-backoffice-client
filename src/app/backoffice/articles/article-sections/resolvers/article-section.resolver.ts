import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { ArticleSectionsService } from '../services/article-sections.service';
import { catchError, mergeMap } from 'rxjs/operators';
import { ArticleSectionAdapter, IArticleSection } from '../interfaces/article-sections.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleSectionResolver implements Resolve<IArticleSection | never> {
  constructor(private readonly articleSectionsService: ArticleSectionsService){
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<never> | Observable<IArticleSection> {
    const id = route.params['id'];
    if(!id) {
      return EMPTY;
    }

    return this.articleSectionsService.getSection(id).pipe(catchError(error => {
        return EMPTY;
      }), mergeMap(data => {
        if (data) {
          return of(new ArticleSectionAdapter(data.data));
        } else {
          return EMPTY;
        }
      })
    );
  }
}
