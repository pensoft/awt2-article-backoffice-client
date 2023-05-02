import { Injectable } from '@angular/core';
import { BaseService } from '@core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { IPagination, PaginationInputData } from '@core/interfaces/pagination.interface';
import { Observable } from 'rxjs';
import {
  IReferenceDefinition,
  IReferenceDefinitionOutputResult,
  ReferenceDefinitionAdapter
} from '../interfaces/reference-definition.interface';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReferenceDefinitionsRepository extends BaseService{

  private apiEndpoint = `/references/definitions`;

  constructor(private http: HttpClient) {
    super()
  }

  getAll(filters: IPagination): Observable<PaginationInputData<IReferenceDefinition>> {
    const queryParams: Params = this.setParameter(filters);
    return this.http.get<PaginationInputData<IReferenceDefinition>>(
      this.apiEndpoint,
      {params: queryParams}
    )
  }

  get(id: number): Observable<IReferenceDefinitionOutputResult> {
    return this.http.get<IReferenceDefinitionOutputResult>(`${this.apiEndpoint}/${id}`);
  }

  update(id: number, data: ReferenceDefinitionAdapter): Observable<IReferenceDefinitionOutputResult> {
    return this.http.put<IReferenceDefinitionOutputResult>(`${this.apiEndpoint}/${id}`, data)
  }

  create(data: ReferenceDefinitionAdapter): Observable<IReferenceDefinitionOutputResult> {
    return this.http.post<IReferenceDefinitionOutputResult>(this.apiEndpoint, data)
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiEndpoint}/${id}`)
  }
}
