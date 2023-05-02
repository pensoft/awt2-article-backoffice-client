import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination, PaginationInputData } from '@core/interfaces/pagination.interface';
import { UsersRepository } from '../repositories';
import { IUserOutputResult, IUsers, UserOutputAdapter } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository) {
  }

  getUsers(filters: IPagination): Observable<PaginationInputData<IUsers>>{
    return this.usersRepository.getUsers(filters)
  }

  createUser(user: UserOutputAdapter): Observable<IUserOutputResult>{
    return this.usersRepository.createUser(user)
  }

  updateUser(id: number, user: UserOutputAdapter): Observable<IUserOutputResult>{
    return this.usersRepository.updateUser(id, user)
  }

  deleteUser(id: number):Observable<any>{
    return this.usersRepository.deleteUser(id);
  }
}
