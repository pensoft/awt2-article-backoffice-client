import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { ArticleLayoutsService } from '../services/article-layouts.service';
import { IArticleLayout } from '../interfaces/article-layouts.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleLayoutResolver {

  constructor(private readonly articleLayoutsService: ArticleLayoutsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<never> | Observable<IArticleLayout> {
    const id = route.params['id'];
    if(!id) {
      return EMPTY;
    }

    return this.articleLayoutsService.getLayout(id).pipe(catchError(error => {
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
