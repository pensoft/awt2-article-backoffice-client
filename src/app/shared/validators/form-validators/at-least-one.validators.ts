import {
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

const isFieldEmpty = (fieldName: string, fg: FormGroup) => {
  const field = fg.get(fieldName).value;
  if (typeof field === 'number') { return field && field >= 0; }
  if (typeof field === 'string') { return field && field.length > 0; }
};

export function atLeastOne(...fields: string[]) {
  return (fg: FormGroup): ValidationErrors | null => {
    return fields.some(fieldName => isFieldEmpty(fieldName, fg))
      ? null
      : ({ atLeastOne: 'At least one field has to be provided.' } as ValidationErrors);
  };
}
