import { AbstractControl } from '@angular/forms';

const ToBeLessOrEqualThan = (number: number) => (control: AbstractControl) => {
  if (+control.value <= number) {
    return null;
  }

  return { isNotLessOrEqual: true };
};

const ToBeMoreThan = (number: number) => (control: AbstractControl) => {
  if (+control.value > number) {
    return null;
  }

  return { isNotMoreThen: true };
};


const ToBeMoreOrEqualThan = (number: number) => (control: AbstractControl) => {
  if (+control.value >= number) {
    return null;
  }

  return { isNotMoreOrEqual: true };
};

const ToBeDiffThan = (number: number) => (control: AbstractControl) => {
  if (+control.value !== number) {
    return null;
  }

  return { isNotDiffThen: true };
};

export { ToBeLessOrEqualThan, ToBeMoreThan, ToBeDiffThan, ToBeMoreOrEqualThan };
