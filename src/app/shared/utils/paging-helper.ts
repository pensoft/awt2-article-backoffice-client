import { PaginationAdapter } from '@core/interfaces/pagination.interface';
import { ParamMap } from '@angular/router';
import { HttpParams } from '@angular/common/http';

export const pagingBuilder = (paramMap, params) => {
  return new PaginationAdapter(params.reduce((acc, value) => {
    let filters = [];
    paramMap.keys.forEach(key => {
      const matches = new RegExp(`${value.name}\\[(?<param>(.*))\\]`, 'gm').exec(key);
      if(matches) {
        filters.push(matches);
      }
      console.log(`${value.name}|${key}`, matches)
    })

    if (paramMap.has(value.name)) {

      acc[value.name] = typeTransformer(paramMap.get(value.name), value.type || 'string');
    } else if (filters.length > 0){
      let result = {};
      filters.forEach(match => {
        console.log('paramMap', paramMap, match.input, paramMap.get(match.input))
        result = {...result, [match.groups.param]: typeTransformer(paramMap.get(match.input), 'string')}
      })
      acc[value.name] = result;
    } else if(typeof value.default !== 'undefined'){
      acc[value.name] = value.default
    }
    return acc;
  }, {}));
}

export const pagingFilterBuilder = (paramMap: ParamMap, params) => {
  let filter = null;
  paramMap.keys.forEach(key => {
    const match = new RegExp(`filter\\[(?<param>(.*))\\]`, 'gm').exec(key);
    if(match) {
      filter = {...filter, [match.groups.param]: typeTransformer(paramMap.get(match.input), 'string')};
    }
  })

  return new PaginationAdapter({...pagingBuilder(paramMap, params), ...(filter ? {filter} : {})})
}

export const getQueryParams = (filters, defaultFilters) => {
  let params = new Map();
  for (const key of Object.keys(filters)) {
    if (filters[key]) {
      if(filters[key] instanceof Object){
        Object.keys(filters[key]).forEach((_k) => {
          params = params.set(`${key.toString()}[${_k}]`, filters[key][_k]);
        })
      } else {
        params = params.set(key.toString(), filters[key]);
      }
    }
  }

  return [...params].filter(v => {
    const find = defaultFilters.find(f => f.name === v[0]);
    return !(find && filters[v[0]] === typeTransformer(find.default, find.type || 'string'))
  }).reduce((acc, v) => ({...acc, [v[0]]: v[1] }), {});
}


const typeTransformer = <T extends string = 'string' | 'number' | 'boolean'>(
  value, type: T
): T extends 'string' ? string : T extends 'number' ? number : boolean => {
  switch (type) {
    case 'string':
      return ('' + value) as any;
    case 'number':
      return +value as any;
    case 'boolean':
      // tslint:disable-next-line: triple-equals
      return (value == 'true') as any;
  }
}
