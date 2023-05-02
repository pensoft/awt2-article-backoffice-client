import { AfterContentChecked, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ArticleTemplatesService } from '../../services/article-templates.service';
import { ArticleTemplateFormComponent } from '../../components/article-template-form/article-template-form.component';
import { ArticleTemplateOutputAdapter, IArticleTemplate } from '../../interfaces/article-templates.interface';
import { NavigationService } from '@core/services/navigation.service';

@Component({
  selector: 'app-article-templates-update',
  templateUrl: './article-templates-update.component.html',
  styleUrls: ['./article-templates-update.component.scss']
})
export class ArticleTemplatesUpdateComponent implements OnInit, AfterContentChecked {

  template: IArticleTemplate;
  @ViewChild(ArticleTemplateFormComponent, { static: true }) templateForm: ArticleTemplateFormComponent;

  constructor(private readonly toastr: ToastrService,
              private readonly translate: TranslateService,
              private readonly router: Router,
              private navigation: NavigationService,
              private readonly route: ActivatedRoute,
              private readonly articleTemplatesService: ArticleTemplatesService,
              private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe((data) => {
      this.template = data.template;
    });
  }

  update(){
    this.articleTemplatesService.updateTemplate(this.template.id, new ArticleTemplateOutputAdapter({
      ...this.templateForm.values,
      version_id: this.template.version_id
    }))
      .pipe(take(1))
      .subscribe(data => {
        this.toastr.success(this.translate.instant('SUCCESS_MESSAGES.CHANGE'), '', {
          positionClass: 'toast-bottom-center',
        });
        this.navigation.back();
      })
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
