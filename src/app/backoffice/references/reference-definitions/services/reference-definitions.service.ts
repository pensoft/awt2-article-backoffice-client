import { Injectable } from '@angular/core';
import { ReferenceDefinitionsRepository } from '../repositories/reference-definitions.repository';
import { IPagination, PaginationInputData } from '@core/interfaces/pagination.interface';
import { Observable } from 'rxjs';
import {
  IReferenceDefinition,
  IReferenceDefinitionOutputResult,
  ReferenceDefinitionAdapter
} from '../interfaces/reference-definition.interface';

@Injectable({
  providedIn: 'root'
})
export class ReferenceDefinitionsService {

  constructor(private readonly referenceDefinitionsRepository: ReferenceDefinitionsRepository) { }

  getAll(filters: IPagination): Observable<PaginationInputData<IReferenceDefinition>> {
    return this.referenceDefinitionsRepository.getAll(filters);
  }

  get(id: number): Observable<IReferenceDefinitionOutputResult> {
    return this.referenceDefinitionsRepository.get(id);
  }

  update(id: number, data: ReferenceDefinitionAdapter): Observable<IReferenceDefinitionOutputResult> {
    return this.referenceDefinitionsRepository.update(id, data);
  }

  create(data: ReferenceDefinitionAdapter): Observable<IReferenceDefinitionOutputResult> {
    return this.referenceDefinitionsRepository.create(data);
  }

  delete(id: number): Observable<any> {
    return this.referenceDefinitionsRepository.delete(id);
  }
}
