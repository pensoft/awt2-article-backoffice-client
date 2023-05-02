import { Injectable } from '@angular/core';
import { ReferenceItemsRepository } from '../repositories/reference-items.repository';
import { IPagination, PaginationInputData } from '@core/interfaces/pagination.interface';
import { Observable } from 'rxjs';
import { IReferenceItem, IReferenceItemOutputResult } from '../interfaces/reference-items.interface';

@Injectable({
  providedIn: 'root'
})
export class ReferenceItemsService {

  constructor(private readonly referenceItemsRepository: ReferenceItemsRepository) { }

  getAll(filters: IPagination): Observable<PaginationInputData<IReferenceItem>> {
    return this.referenceItemsRepository.getAll(filters);
  }

  get(id: number): Observable<IReferenceItemOutputResult> {
    return this.referenceItemsRepository.get(id);
  }
}
