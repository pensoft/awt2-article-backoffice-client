import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ArticleListAdapter, IArticle } from '../../interfaces/articles.interface';
import { IPagination, PaginationAdapter } from '@core/interfaces/pagination.interface';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ArticlesService } from '../../services/articles.service';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { BasePaginationComponent } from '../../../shared/components/base-pagination/base-pagination.component';

@Component({
  selector: 'app-articles-table',
  templateUrl: './articles-table.component.html',
  styleUrls: ['./articles-table.component.scss']
})
export class ArticlesTableComponent extends BasePaginationComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  public displayedColumns = ['id', 'uuid', 'name', 'layout_name', 'created_at', 'actions'];
  public dataSource = new MatTableDataSource<ArticleListAdapter>([])
  public filters: IPagination = new PaginationAdapter({
    page: 1,
    pageSize: 10,
    sort: '-id'
  });
  totalCount = 0;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  protected confirmationMessage = `Are you sure you want to delete the article?`;

  constructor(
    public readonly router: Router,
    public readonly route: ActivatedRoute,
    private readonly translate: TranslateService,
    private readonly toastr: ToastrService,
    private readonly articlesService: ArticlesService,
    public readonly dialog: MatDialog,
  ) {
    super(router, dialog, route);
  }

  ngOnInit(): void {
    this.setIncomingFilterValues();
  }

  getData(){
    this.setQueryParams()

    this.articlesService.getArticles(this.filters)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        const {data, meta: {pagination}} = result;
        this.totalCount = pagination.total;
        this.dataSource.data = data.map(item => new ArticleListAdapter(item))
      });
  }

  delete(article: IArticle) {
    this.confirmDialog((isConfirmed: boolean) => {
      if(isConfirmed) {
        this.articlesService.deleteArticle(article.id).subscribe(() => {
          this.getData();
          this.toastr.success(this.translate.instant('SUCCESS_MESSAGES.DELETE'), '', {
            positionClass: 'toast-bottom-center',
          });
        })
      }
    })
  }
}
