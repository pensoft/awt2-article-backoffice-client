import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  constructor() { }

  protected setParameter(query: Params): HttpParams {

    let params: HttpParams = new HttpParams();
    for (const key of Object.keys(query)) {
      if (query[key]) {
        if (query[key] instanceof Object) {
          Object.keys(query[key]).forEach((_k) => {
            params = params.append(`${key.toString()}[${_k}]`, query[key][_k]);
          })
        } else if (query[key] instanceof Array) {
          query[key].forEach((item) => {
            if(typeof item === 'object'){
              Object.keys(item).forEach((_k) => {
                params = params.append(`${key.toString()}[${_k}]`, item[_k]);
              })
            } else {
              params = params.append(`${key.toString()}[]`, item);
            }
          });
        } else {
          params = params.append(key.toString(), query[key]);
        }
      }
    }

    return params;
  }
}
