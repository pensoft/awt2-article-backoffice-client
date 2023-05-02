import { AbstractControl, ValidationErrors } from '@angular/forms';

export function jsonValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value || isObject(control.value)) return null;

  try {
    JSON.parse(control.value);
  } catch (e) {
    return { jsonInvalid: true };
  }

  return null;
}


function isObject(obj): boolean {
  return obj !== undefined && obj !== null && obj.constructor == Object;
}
