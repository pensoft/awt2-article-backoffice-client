import { Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IPagination } from '@core/interfaces/pagination.interface';
import { MatSort, Sort } from '@angular/material/sort';
import {
  ConfirmationDialogComponent,
  ConfirmDialogModel
} from '@shared/common/confirmation-dialog/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { getQueryParams, pagingFilterBuilder } from '@shared/utils/paging-helper';
import { ActivatedRoute, Router } from '@angular/router';

@Component({template: ''})
export abstract class BasePaginationComponent {
  protected confirmationMessage = `Are you sure you want to delete the item?`;
  protected defaultFilters = [
    {
      name: 'page',
      type: 'number',
      default: 1
    },
    {
      name: 'pageSize',
      type: 'number',
      default: 10
    },
    {
      name: 'sort',
      type: 'string',
      default: '-id'
    },
    {
      name: 'filter',
      type: 'object',
    }
  ];
  public filters: IPagination;
  totalCount = 0;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  getData(){}

  protected constructor(
    public readonly router: Router,
    public readonly dialog: MatDialog,
    public readonly route: ActivatedRoute,){
  }

  setIncomingFilterValues() {
    this.filters =  pagingFilterBuilder(this.route.snapshot.queryParamMap, this.defaultFilters);

    const direction = /^-/.test(this.filters.sort)? 'desc':'asc';
    const active = this.filters.sort.replace(/^-/, ``);

    const sortState: Sort = { active, direction };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;

    this.getData();
  };

  setQueryParams(){
    const params = getQueryParams(this.filters, this.defaultFilters);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      replaceUrl: true,
    });
  }

  public pageChange(event: PageEvent) {
    this.setUpFilters({ pageSize: event.pageSize, page: event.pageIndex + 1 });
  }

  public setUpFilters(filters: Partial<IPagination>){
    this.filters = Object.assign({}, this.filters, filters);
    this.getData();
  }

  public sortChange(event: Sort){
    const sortSign = event.direction === 'desc' ? '-':''
    this.setUpFilters({sort: `${sortSign}${event.active}`});
  }

  protected confirmDialog(callback: any): void {
    const dialogData = new ConfirmDialogModel("Confirm Action", this.confirmationMessage);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      callback(dialogResult);
    });
  }
}
