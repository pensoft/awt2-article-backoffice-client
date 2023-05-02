import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleSectionTypes } from '../../enums/article-section-types';
import { IPagination } from '@core/interfaces/pagination.interface';
import {
  ArticleSectionsTableComponent
} from '../../components/article-sections-table/article-sections-table.component';
import { ArticleSectionsService } from '../../services/article-sections.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-article-sections-list',
  templateUrl: './article-sections-list.component.html',
  styleUrls: ['./article-sections-list.component.scss']
})
export class ArticleSectionsListComponent implements OnInit {
  public articleSectionTypes = ArticleSectionTypes
  public filters: IPagination;
  @ViewChild(ArticleSectionsTableComponent, { static: true }) tableComponent: ArticleSectionsTableComponent;
  constructor(
    private readonly articleSectionsService: ArticleSectionsService,
  ) { }

  ngOnInit(): void {

  }

  filtersChanged(filters: IPagination) {
    this.tableComponent.setUpFilters(filters);
  }

  onFilesAdded(files) {
    const formData = new FormData();

    for (var i = 0; i < files.length; i++) {
      formData.append("files[]", files[i]);
    }

    this.articleSectionsService.importSections(formData).pipe(take(1)).subscribe(data => {
      this.filtersChanged(this.filters);
    });
  }
}
