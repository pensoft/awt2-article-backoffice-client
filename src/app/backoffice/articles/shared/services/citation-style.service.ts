import { Injectable } from '@angular/core';
import { CitationStyleRepository } from '../repositories/citation-style.repository';
import { IPagination, PaginationInputData } from '@core/interfaces/pagination.interface';
import { Observable } from 'rxjs';
import { CitationStyleAdapter } from '../interfaces/citation-style.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitationStyleService {

  constructor(private readonly citationStyleRepository: CitationStyleRepository) { }

  getCitationStyles(filters: IPagination): Observable<PaginationInputData<CitationStyleAdapter>> {
    return this.citationStyleRepository.getCitationStyles(filters)
      .pipe(
        map(result => ({
          ...result,
          data: result.data.map(item => new CitationStyleAdapter(item))
        }))
      )
  }
}
