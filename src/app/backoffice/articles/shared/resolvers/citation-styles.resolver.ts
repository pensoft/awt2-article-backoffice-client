import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { IPagination, PaginationAdapter } from '@core/interfaces/pagination.interface';
import { CitationStyleService } from '../services/citation-style.service';
import { CitationStyleAdapter } from '../interfaces/citation-style.interface';

@Injectable({
  providedIn: 'root'
})
export class CitationStylesResolver {

  public filters: IPagination = new PaginationAdapter({
    page: 1,
    pageSize: 999999
  });
  constructor(private readonly citationStyleService: CitationStyleService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<never> | Observable<CitationStyleAdapter[]> {
    return this.citationStyleService.getCitationStyles(this.filters).pipe(catchError(error => {
        return EMPTY;
      }), mergeMap(result => {
        if (result) {
          const { data } = result;
          return of(data);
        } else {
          return EMPTY;
        }
      })
    );
  }
}
