import { Component, ViewChild } from '@angular/core';
import { ArticleLayoutFormComponent } from '../../components/article-layout-form/article-layout-form.component';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ArticleLayoutsService } from '../../services/article-layouts.service';
import { take } from 'rxjs/operators';
import { ArticleLayoutOutput } from '../../interfaces/article-layouts.interface';
import { NavigationService } from '@core/services/navigation.service';

@Component({
  selector: 'app-article-layouts-create',
  templateUrl: './article-layouts-create.component.html',
  styleUrls: ['./article-layouts-create.component.scss']
})
export class ArticleLayoutsCreateComponent {

  @ViewChild(ArticleLayoutFormComponent, {static: true}) layoutForm: ArticleLayoutFormComponent;
  constructor(private readonly toastr: ToastrService,
              private readonly translate: TranslateService,
              private readonly router: Router,
              private navigation: NavigationService,
              private readonly route: ActivatedRoute,
              private readonly articleLayoutsService: ArticleLayoutsService) { }

  create(){
    this.articleLayoutsService.createLayout(new ArticleLayoutOutput(this.layoutForm.values))
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
