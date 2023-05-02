import { Injectable } from '@angular/core';
import { BaseService } from '@core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { IPagination, PaginationInputData } from '@core/interfaces/pagination.interface';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import {
  IReferenceItem,
  IReferenceItemOutputResult,
  ReferenceItemAdapter
} from '../interfaces/reference-items.interface';

@Injectable({
  providedIn: 'root'
})
export class ReferenceItemsRepository extends BaseService{

  private apiEndpoint = `/references/items`;

  constructor(private http: HttpClient) {
    super()
  }

  getAll(filters: IPagination): Observable<PaginationInputData<IReferenceItem>> {
    const queryParams: Params = this.setParameter(filters);
    return this.http.get<PaginationInputData<IReferenceItem>>(
      this.apiEndpoint,
      {params: queryParams}
    )
  }

  get(id: number): Observable<IReferenceItemOutputResult> {
    return this.http.get<IReferenceItemOutputResult>(`${this.apiEndpoint}/${id}`);
  }

  update(id: number, data: ReferenceItemAdapter): Observable<IReferenceItemOutputResult> {
    return this.http.put<IReferenceItemOutputResult>(`${this.apiEndpoint}/${id}`, data)
  }

  create(data: ReferenceItemAdapter): Observable<IReferenceItemOutputResult> {
    return this.http.post<IReferenceItemOutputResult>(this.apiEndpoint, data)
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiEndpoint}/${id}`)
  }
}
