import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { IRole } from '../../interfaces/roles.interface';
import { IUsers } from '../../interfaces/users.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  formGroup: FormGroup;
  @Input() roles: IRole[] = [];
  @Input() defaultData: IUsers;

  constructor(private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildTheForm(this.defaultData);
  }

  buildTheForm(defaultData: IUsers | null) {
    this.formGroup = this.fb.group({
      name: this.fb.control(defaultData?.name, [Validators.required, Validators.minLength(2)]),
      email: this.fb.control(defaultData?.email, [Validators.required, Validators.email]),
      password: this.fb.control('', defaultData ? [
        Validators.minLength(6),
        Validators.maxLength(24)
      ] : [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24)
      ]),
      roleId: this.fb.control(defaultData?.role?.id, [Validators.required])
    })
  }

  get isFormValid() {
    return this.formGroup?.valid
  }

  get values() {
    return this.formGroup.getRawValue()
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
