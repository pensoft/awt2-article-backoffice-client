import { AfterContentChecked, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ArticleTemplateFormComponent } from '../../components/article-template-form/article-template-form.component';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleTemplatesService } from '../../services/article-templates.service';
import { take } from 'rxjs/operators';
import { ArticleTemplateOutputAdapter } from '../../interfaces/article-templates.interface';
import { NavigationService } from '@core/services/navigation.service';

@Component({
  selector: 'app-article-templates-create',
  templateUrl: './article-templates-create.component.html',
  styleUrls: ['./article-templates-create.component.scss']
})
export class ArticleTemplatesCreateComponent implements AfterContentChecked{

  @ViewChild(ArticleTemplateFormComponent, { static: true }) templateForm: ArticleTemplateFormComponent;

  constructor(private readonly toastr: ToastrService,
              private readonly translate: TranslateService,
              private readonly router: Router,
              private navigation: NavigationService,
              private readonly route: ActivatedRoute,
              private readonly articleTemplatesService: ArticleTemplatesService,
              private cdref: ChangeDetectorRef) { }

  create(){
    this.articleTemplatesService.createTemplate(new ArticleTemplateOutputAdapter(this.templateForm.values))
      .pipe(take(1))
      .subscribe(data => {
        this.toastr.success(this.translate.instant('SUCCESS_MESSAGES.CREATE'), '', {
          positionClass: 'toast-bottom-center',
        });
        this.navigation.back();
      })
  }

  goBack(): void {
    this.navigation.back();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
