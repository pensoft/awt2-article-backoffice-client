import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { Subject } from 'rxjs';
import { UsersRepository } from '../../repositories';
import { IUsers, UserOutputAdapter } from '../../interfaces/users.interface';
import { take } from 'rxjs/operators';
import { IRole } from '../../interfaces/roles.interface';
import { UsersService } from '../../services';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit, OnDestroy {
  isEdit = false;
  title = 'Add user';
  private unsubscribe$ = new Subject<void>();
  userRoles: IRole[] = [];
  defaultData: IUsers;

  @ViewChild('userForm', { static: true }) userForm: UserFormComponent;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<UserDialogComponent>,
              private readonly usersService: UsersService,
              private readonly translate: TranslateService,
              private readonly toastr: ToastrService) {
    this.userRoles = data.userRoles;
    if(data.user) {
      this.isEdit = true;
      this.title = 'Edit user';
      this.defaultData = data.user;
    }
  }

  ngOnInit(): void {

  }

  save(){
    if (this.isEdit) {
      this.update();
    }
    else {
      this.create();
    }
  }

  create(){
    this.usersService.createUser(new UserOutputAdapter(this.userForm.values))
      .pipe(take(1))
      .subscribe(data => {
        this.dialogRef.close(true);
        this.toastr.success(this.translate.instant('SUCCESS_MESSAGES.CREATE'), '', {
          positionClass: 'toast-bottom-center',
        });

      })
  }

  update(){
    this.usersService.updateUser(this.defaultData.id, new UserOutputAdapter(this.userForm.values))
      .pipe(take(1))
      .subscribe(data => {
        this.dialogRef.close(true);
        this.toastr.success(this.translate.instant('SUCCESS_MESSAGES.CHANGE'), '', {
          positionClass: 'toast-bottom-center',
        });
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
