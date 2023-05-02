import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ArticleLayoutAdapter, IArticleLayout } from '../../interfaces/article-layouts.interface';
import { IPagination } from '@core/interfaces/pagination.interface';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ArticleLayoutsService } from '../../services/article-layouts.service';
import { takeUntil } from 'rxjs/operators';
import { BasePaginationComponent } from '../../../shared/components/base-pagination/base-pagination.component';

@Component({
  selector: 'app-article-layouts-table',
  templateUrl: './article-layouts-table.component.html',
  styleUrls: ['./article-layouts-table.component.scss']
})
export class ArticleLayoutsTableComponent extends BasePaginationComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  public displayedColumns = ['id', 'name', 'version', 'template', 'created_at', 'actions'];
  public dataSource = new MatTableDataSource<ArticleLayoutAdapter>([]);
  public filters: IPagination;
  totalCount = 0;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  protected confirmationMessage = `Are you sure you want to delete the layout?`;

  constructor(
    public readonly router: Router,
    public readonly route: ActivatedRoute,
    private readonly translate: TranslateService,
    private readonly toastr: ToastrService,
    public readonly dialog: MatDialog,
    private readonly articleLayoutsService: ArticleLayoutsService
  ) {
    super(router, dialog, route);
  }

  ngOnInit(): void {
    this.setIncomingFilterValues();
  }

  getData(){
    this.setQueryParams()

    this.articleLayoutsService.getLayouts(this.filters)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        const { data, meta: { pagination } } = result;
        this.totalCount = pagination.total;
        this.dataSource.data = data.map(item => new ArticleLayoutAdapter(item));
      });
  }

  delete(template: IArticleLayout) {
    this.confirmDialog((isConfirmed: boolean) => {
      if(isConfirmed) {
        this.articleLayoutsService.deleteLayouts(template.id).subscribe(() => {
          this.getData();
          this.toastr.success(this.translate.instant('SUCCESS_MESSAGES.DELETE'), '', {
            positionClass: 'toast-bottom-center',
          });
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
