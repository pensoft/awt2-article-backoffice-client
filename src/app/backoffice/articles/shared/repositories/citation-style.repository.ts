import { Injectable } from '@angular/core';
import { BaseService } from '@core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { IPagination, PaginationInputData } from '@core/interfaces/pagination.interface';
import { Observable } from 'rxjs';
import { ICitationStyle } from '../interfaces/citation-style.interface';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CitationStyleRepository  extends BaseService{

  constructor(private http: HttpClient) {
    super()
  }

  getCitationStyles(filters: IPagination): Observable<PaginationInputData<ICitationStyle>> {
    const queryParams: Params = this.setParameter(filters);
    return this.http.get<PaginationInputData<ICitationStyle>>(
      `/citation-styles`,
      { params: queryParams}
    )
  }
}
