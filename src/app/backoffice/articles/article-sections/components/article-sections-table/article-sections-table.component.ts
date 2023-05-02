import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ArticleSectionListAdapter, IArticleSection } from '../../interfaces/article-sections.interface';
import { IPagination } from '@core/interfaces/pagination.interface';
import { MatSort } from '@angular/material/sort';
import { take, takeUntil } from 'rxjs/operators';
import { ArticleSectionsService } from '../../services/article-sections.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ArticleSectionTypes } from '../../enums/article-section-types';
import { BasePaginationComponent } from '../../../shared/components/base-pagination/base-pagination.component';

@Component({
  selector: 'app-article-sections-table',
  templateUrl: './article-sections-table.component.html',
  styleUrls: ['./article-sections-table.component.scss']
})
export class ArticleSectionsTableComponent extends BasePaginationComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  public displayedColumns = ['id', 'name', 'version', 'type', 'created_at', 'actions'];
  public dataSource = new MatTableDataSource<ArticleSectionListAdapter>([]);
  public filters: IPagination;
  totalCount = 0;
  articleSectionTypes = ArticleSectionTypes;

  @Output() filterChanged: EventEmitter<IPagination> = new EventEmitter();
  @Input() filter: IPagination;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  protected confirmationMessage = `Are you sure you want to delete the section?`;

  constructor(
    public readonly router: Router,
    public readonly route: ActivatedRoute,
    private readonly translate: TranslateService,
    private readonly toastr: ToastrService,
    private readonly articleSectionsService: ArticleSectionsService,
    public readonly dialog: MatDialog,
  ) {
    super(router, dialog, route);
  }

  ngOnInit(): void {
    this.setIncomingFilterValues();
  }

  getData(){
    this.filterChanged.emit(this.filters);
    this.setQueryParams();

    this.articleSectionsService.getSections(this.filters)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        const { data, meta: { pagination } } = result;
        this.totalCount = pagination.total;
        this.dataSource.data = data.map(item => new ArticleSectionListAdapter(item));
      });
  }

  delete(section: IArticleSection) {
    this.confirmDialog((isConfirmed: boolean) => {
      if(isConfirmed) {
        this.articleSectionsService.deleteSection(section.id).subscribe(() => {
          this.getData();
          this.toastr.success(this.translate.instant('SUCCESS_MESSAGES.DELETE'), '', {
            positionClass: 'toast-bottom-center',
          });
        })
      }
    })
  }


  export(id) {
    this.articleSectionsService.exportSection(id).pipe(take(1)).subscribe(({data}) => this.downLoadFile(data));
  }


  downLoadFile(data) {
    let filename: string = `${data.name}.json`
    let dataType = 'application/json';
    let binaryData = [];
    binaryData.push(JSON.stringify(data));
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
    downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
}
