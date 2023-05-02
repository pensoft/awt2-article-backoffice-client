import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IReferenceItem, ReferenceItemAdapter } from '../../interfaces/reference-items.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ReferenceItemsService } from '../../services/reference-items.service';
import {
  BasePaginationComponent
} from '../../../../articles/shared/components/base-pagination/base-pagination.component';
import { MatTableDataSource } from '@angular/material/table';
import { filter, take, takeUntil } from 'rxjs/operators';
import {
  SCHEMA_MODE,
  SchemaDialogComponent
} from '../../../../articles/shared/components/schema-dialog/schema-dialog.component';

@Component({
  selector: 'app-reference-items-table',
  templateUrl: './reference-items-table.component.html',
  styleUrls: ['./reference-items-table.component.scss']
})
export class ReferenceItemsTableComponent extends BasePaginationComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  public displayedColumns = ['uuid', 'title', 'referenceDefinition', 'author', 'created_at', 'updated_at', 'actions'];
  public dataSource = new MatTableDataSource<ReferenceItemAdapter>([]);

  constructor(public readonly router: Router,
              public readonly route: ActivatedRoute,
              private readonly translate: TranslateService,
              private readonly toastr: ToastrService,
              public readonly dialog: MatDialog,
              public readonly referenceItemsService: ReferenceItemsService) {
    super(router, dialog, route);
  }

  ngOnInit(): void {
    this.setIncomingFilterValues();
  }

  getData() {
    this.setQueryParams()
    this.referenceItemsService.getAll(this.filters)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        const {data, meta: {pagination}} = result;
        this.totalCount = pagination.total;
        this.dataSource.data = data.map(item => new ReferenceItemAdapter(item));
      });
  }

  showData(item: IReferenceItem) {
    let schema = '';
    try {
      schema = JSON.stringify(item.data, null, ' ');
    } catch (e) {
    }
    this.dialog.open(SchemaDialogComponent, {
      data: {
        schema,
        title: 'Data',
        readonly: true
      },
      width: '800px',
      maxHeight: 'fit-content',
      autoFocus: false,
      restoreFocus: false
    }).afterClosed()
      .pipe(
        filter(data => data),
        take(1)
      ).subscribe(data => {

    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
