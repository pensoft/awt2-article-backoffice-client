import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ArticleTemplateListAdapter, IArticleTemplate } from '../../interfaces/article-templates.interface';
import { IPagination, PaginationAdapter } from '@core/interfaces/pagination.interface';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ArticleTemplatesService } from '../../services/article-templates.service';
import { takeUntil } from 'rxjs/operators';
import { BasePaginationComponent } from '../../../shared/components/base-pagination/base-pagination.component';

@Component({
  selector: 'app-article-templates-table',
  templateUrl: './article-templates-table.component.html',
  styleUrls: ['./article-templates-table.component.scss']
})
export class ArticleTemplatesTableComponent extends BasePaginationComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  public displayedColumns = ['id', 'name', 'version', 'created_at', 'actions'];
  public dataSource = new MatTableDataSource<ArticleTemplateListAdapter>([]);
  public filters: IPagination = new PaginationAdapter({
    page: 1,
    pageSize: 10
  });
  totalCount = 0;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  confirmationMessage = `Are you sure you want to delete the article template?`

  constructor(
    public readonly router: Router,
    public readonly route: ActivatedRoute,
    private readonly translate: TranslateService,
    private readonly toastr: ToastrService,
    private readonly articleTemplatesService: ArticleTemplatesService,
    public readonly dialog: MatDialog,
  ) {
    super(router, dialog, route);
  }

  ngOnInit(): void {
    this.setIncomingFilterValues();
  }

  getData(){
    this.setQueryParams()

    this.articleTemplatesService.getTemplates(this.filters)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        const { data, meta: { pagination } } = result;
        this.totalCount = pagination.total;
        this.dataSource.data = data.map(item => new ArticleTemplateListAdapter(item));
      });
  }

  delete(template: IArticleTemplate) {
    this.confirmDialog((isConfirmed: boolean) => {
      if(isConfirmed) {
        this.articleTemplatesService.deleteTemplate(template.id).subscribe(() => {
          this.getData();
          this.toastr.success(this.translate.instant('SUCCESS_MESSAGES.DELETE'), '', {
            positionClass: 'toast-bottom-center',
          });
        })
      }
    })
  }
}
