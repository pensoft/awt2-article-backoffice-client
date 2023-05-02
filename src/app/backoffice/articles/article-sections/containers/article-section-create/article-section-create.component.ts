import { Component, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { ArticleSectionsService } from '../../services/article-sections.service';
import { ArticleSectionOutputAdapter } from '../../interfaces/article-sections.interface';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleSectionFormComponent } from '../../components/article-section-form/article-section-form.component';
import { NavigationService } from '@core/services/navigation.service';
import { ArticleSectionTypes } from '../../enums/article-section-types';

@Component({
  selector: 'app-article-section-create',
  templateUrl: './article-section-create.component.html',
  styleUrls: ['./article-section-create.component.scss']
})
export class ArticleSectionCreateComponent {

  articleSectionTypes = ArticleSectionTypes;
  public type: ArticleSectionTypes = ArticleSectionTypes.SIMPLE;
  @ViewChild(ArticleSectionFormComponent, { static: true }) sectionForm: ArticleSectionFormComponent;

  constructor(
    private readonly articleSectionsService: ArticleSectionsService,
    private readonly toastr: ToastrService,
    private readonly translate: TranslateService,
    private readonly router: Router,
    private navigation: NavigationService,
    private readonly route: ActivatedRoute
  ) {

    this.type = +this.route.snapshot.queryParamMap.get('type');
  }


  create(){
    this.articleSectionsService.createSection(new ArticleSectionOutputAdapter(this.sectionForm.values))
      .pipe(take(1))
      .subscribe(data => {
        this.toastr.success(this.translate.instant('SUCCESS_MESSAGES.CREATE'), '', {
          positionClass: 'toast-bottom-center',
        });
        this.goBack();
      })
  }

  goBack(): void {
    this.navigation.back();
  }
}
