import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  BasePaginationComponent
} from '../../../../articles/shared/components/base-pagination/base-pagination.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ReferenceDefinitionsService } from '../../services/reference-definitions.service';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { IReferenceDefinition, ReferenceDefinitionAdapter } from '../../interfaces/reference-definition.interface';


@Component({
  selector: 'app-reference-definitions-table',
  templateUrl: './reference-definitions-table.component.html',
  styleUrls: ['./reference-definitions-table.component.scss']
})
export class ReferenceDefinitionsTableComponent extends BasePaginationComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  protected confirmationMessage = `Are you sure you want to delete the reference definition?`;
  public displayedColumns = ['id', 'title', 'actions'];
  public dataSource = new MatTableDataSource<ReferenceDefinitionAdapter>([]);
  constructor(
    public readonly router: Router,
    public readonly route: ActivatedRoute,
    private readonly translate: TranslateService,
    private readonly toastr: ToastrService,
    public readonly dialog: MatDialog,
    private readonly referenceDefinitionsService: ReferenceDefinitionsService
  ) {
    super(router, dialog, route);
  }

  ngOnInit(): void {
    this.setIncomingFilterValues();
  }

  getData(){
    this.setQueryParams()

    this.referenceDefinitionsService.getAll(this.filters)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        const { data, meta: { pagination } } = result;
        this.totalCount = pagination.total;
        this.dataSource.data = data.map(item => new ReferenceDefinitionAdapter(item));
      });
  }

  delete(item: IReferenceDefinition) {
    this.confirmDialog((isConfirmed: boolean) => {
      if (isConfirmed) {
        this.referenceDefinitionsService.delete(item.id).subscribe(() => {
          this.getData();
          this.toastr.success(this.translate.instant('SUCCESS_MESSAGES.DELETE'), '', {
            positionClass: 'toast-bottom-center',
          });
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
