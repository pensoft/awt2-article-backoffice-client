import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { IReferenceDefinition } from '../interfaces/reference-definition.interface';
import { ReferenceDefinitionsRepository } from '../repositories/reference-definitions.repository';

@Injectable({
  providedIn: 'root'
})
export class ReferenceDefinitionResolver {

  constructor(private readonly referenceDefinitionsRepository: ReferenceDefinitionsRepository) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<never> | Observable<IReferenceDefinition> {
    const id = route.params['id'];
    if(!id) {
      return EMPTY;
    }

    return this.referenceDefinitionsRepository.get(id).pipe(catchError(error => {
        return EMPTY;
      }), mergeMap(data => {
        if (data) {
          return of(data.data);
        } else {
          return EMPTY;
        }
      })
    );
  }
}
