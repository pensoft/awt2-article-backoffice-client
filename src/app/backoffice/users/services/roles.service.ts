import { Injectable } from '@angular/core';
import { UsersRepository } from '../repositories';
import { Observable } from 'rxjs';
import { IRole } from '../interfaces/roles.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private readonly usersRepository: UsersRepository) { }

  getRoles(): Observable<IRole[]>{
    return this.usersRepository.getRoles().pipe(map(result => result.data))
  }
}
