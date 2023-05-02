import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { getClassByStatus } from '@shared/utils/status-helper';
import { UserRegisterStatus } from '@shared/enums';
import { IPagination, PaginationAdapter } from '@core/interfaces/pagination.interface';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { IUsers, UsersListAdapter } from '../../interfaces/users.interface';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../../components/user-dialog/user-dialog.component';
import { IRole } from '../../interfaces/roles.interface';
import {
  ConfirmationDialogComponent,
  ConfirmDialogModel
} from '@shared/common/confirmation-dialog/components/confirmation-dialog/confirmation-dialog.component';
import { UsersService } from '../../services';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  private userRegisterStatus = UserRegisterStatus;
  public displayedColumns = ['id', 'name', 'email', 'role', 'status', 'actions'];
  public dataSource = new MatTableDataSource<UsersListAdapter>([]);
  public filters: IPagination = new PaginationAdapter({
    page: 1,
    pageSize: 10
  });
  totalCount = 0;
  userRoles: IRole[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public readonly dialog: MatDialog,
    private readonly translate: TranslateService,
    private readonly toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe((data) => {
      this.userRoles = data.roles;
    });
    this.getData();
  }

  getData(){
    this.usersService.getUsers(this.filters)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        const { data, meta: { pagination } } = result;
        this.totalCount = pagination.total;
        this.dataSource.data = data.map(item => new UsersListAdapter(item));
      });
  }

  public pageChange(event: PageEvent) {
    this.setUpFilters({ pageSize: event.pageSize, page: event.pageIndex + 1 });
    this.navigate();
  }

  public setUpFilters(filters: Partial<IPagination>){
    this.filters = Object.assign({}, this.filters, filters);
    this.getData();
  }

  public sortChange(event: Sort){
    const sortSign = event.direction === 'desc' ? '-':''
    this.setUpFilters({sort: `${sortSign}${event.active}`});
  }

  public addUser() {
    this.dialog.open(UserDialogComponent, {
      data: {
        userRoles: this.userRoles
      },
      width: '650px',
      maxHeight: 'fit-content',
      autoFocus: false,
      restoreFocus: false
    }).afterClosed().subscribe(res => {
      if(res) {
        this.getData();
      }
    });
  }

  public editUser(user: IUsers) {
    this.dialog.open(UserDialogComponent, {
      data: {
        userRoles: this.userRoles,
        user
      },
      width: '650px',
      maxHeight: 'fit-content',
      autoFocus: false,
      restoreFocus: false
    }).afterClosed().subscribe(res => {
      if(res) {
        this.getData();
      }
    });
  }

  public deleteUser(user: IUsers){
    this.confirmDialog((isConfirmed: boolean) => {
      if(isConfirmed) {
        this.usersService.deleteUser(user.id).subscribe(() => {
          this.getData();
          this.toastr.success(this.translate.instant('SUCCESS_MESSAGES.DELETE'), '', {
            positionClass: 'toast-bottom-center',
          });
        })
      }
    })
  }

  confirmDialog(callback: any): void {
    const message = `Are you sure you want to delete the user?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      callback(dialogResult);
    });
  }

  private navigate() {

    /*this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      replaceUrl: true,
    });*/
  }

  getBadgeByStatus(status: UserRegisterStatus) {
    return getClassByStatus(status);
  }

  getStatusNameById(status: UserRegisterStatus) {
    return UserRegisterStatus[status];
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  protected setParameter(routerParams: Params): HttpParams {
    let queryParams = new HttpParams();
    for (const key in routerParams) {
      if (routerParams.hasOwnProperty(key)) {
        queryParams = queryParams.set(key, routerParams[key]);
      }
    }
    return queryParams;
  }
}
