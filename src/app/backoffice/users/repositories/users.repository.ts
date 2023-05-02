import { BaseService } from '@core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { IPagination, PaginationInputData } from '@core/interfaces/pagination.interface';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { Injectable } from '@angular/core';
import { IUserOutputResult, IUsers, UserOutputAdapter } from '../interfaces/users.interface';
import { IRole, IRoleData, IRolesData } from '../interfaces/roles.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersRepository extends BaseService{

  constructor(private http: HttpClient) {
    super()
  }

  getUsers(filters: IPagination): Observable<PaginationInputData<IUsers>>{
    const queryParams: Params = this.setParameter(filters);
    return this.http.get<PaginationInputData<IUsers>>(`/users`, { params: queryParams })
  }

  createUser(user: UserOutputAdapter): Observable<IUserOutputResult>{
    return this.http.post<IUserOutputResult>(`/users`, user)
  }

  updateUser(id: any, user: UserOutputAdapter): Observable<IUserOutputResult>{
    return this.http.put<IUserOutputResult>(`/users/${id}`, user)
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete<any>(`/users/${id}`);
  }

  getRoles(): Observable<IRolesData> {
    return this.http.get<IRolesData>(`/users/roles`)
  }
}
