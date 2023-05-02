import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IRole } from '../interfaces/roles.interface';
import { RolesService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class RolesResolver implements Resolve<IRole[] | never> {
  constructor(private readonly rolesService: RolesService) {
  }
  resolve(): Observable<IRole[]> | Observable<never> {
    return this.rolesService.getRoles();
  }
}
