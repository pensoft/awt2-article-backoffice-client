import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ArticleSectionListAdapter, ArticleSectionOutputAdapter } from '../../interfaces/article-sections.interface';
import { take } from 'rxjs/operators';
import { ArticleSectionsService } from '../../services/article-sections.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleSectionFormComponent } from '../../components/article-section-form/article-section-form.component';
import { ArticleSectionTypes } from '../../enums/article-section-types';
import { NavigationService } from '@core/services/navigation.service';

@Component({
  selector: 'app-article-section-update',
  templateUrl: './article-section-update.component.html',
  styleUrls: ['./article-section-update.component.scss']
})
export class ArticleSectionUpdateComponent implements OnInit {
  section: ArticleSectionListAdapter;
  articleSectionTypes = ArticleSectionTypes;
  @ViewChild(ArticleSectionFormComponent, { static: true }) sectionForm: ArticleSectionFormComponent;
  constructor(
    private readonly articleSectionsService: ArticleSectionsService,
    private readonly toastr: ToastrService,
    private readonly translate: TranslateService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private navigation: NavigationService
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe((data) => {
      this.section = data.section;
    });

  }

  update(){
    this.articleSectionsService.updateSections(this.section.id, new ArticleSectionOutputAdapter(
      {
        ...this.sectionForm.values,
        version_id: this.section.version_id
      }))
      .pipe(take(1))
      .subscribe(data => {
        this.toastr.success(this.translate.instant('SUCCESS_MESSAGES.CHANGE'), '', {
          positionClass: 'toast-bottom-center',
        });
        this.goBack();
      })
  }

  goBack(): void {
    this.navigation.back();
  }
}
