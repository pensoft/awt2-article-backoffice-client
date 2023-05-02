import { AfterContentChecked, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ArticleLayoutsService } from '../../services/article-layouts.service';
import { ArticleLayoutFormComponent } from '../../components/article-layout-form/article-layout-form.component';
import { take } from 'rxjs/operators';
import { ArticleLayoutOutput, IArticleLayout } from '../../interfaces/article-layouts.interface';
import { MatDialog } from '@angular/material/dialog';
import { SchemaDialogComponent } from '../../../shared/components/schema-dialog/schema-dialog.component';
import { IArticleTemplate } from '../../../article-templates/interfaces/article-templates.interface';
import { NavigationService } from '@core/services/navigation.service';

@Component({
  selector: 'app-article-layouts-update',
  templateUrl: './article-layouts-update.component.html',
  styleUrls: ['./article-layouts-update.component.scss']
})
export class ArticleLayoutsUpdateComponent implements OnInit, AfterContentChecked {

  layout: IArticleLayout;
  @ViewChild(ArticleLayoutFormComponent, {static: true}) layoutForm: ArticleLayoutFormComponent;
  constructor(private readonly toastr: ToastrService,
              private readonly translate: TranslateService,
              private readonly router: Router,
              private navigation: NavigationService,
              private readonly route: ActivatedRoute,
              private readonly articleLayoutsService: ArticleLayoutsService,
              private readonly dialog: MatDialog,
              private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe((data) => {
      this.layout = data.layout;
    });
  }

  update(){
    this.articleLayoutsService.updateLayout(this.layout.id, new ArticleLayoutOutput({
      ...this.layoutForm.values,
      version_id: this.layout.version_id
    }))
      .pipe(take(1))
      .subscribe(data => {
        this.toastr.success(this.translate.instant('SUCCESS_MESSAGES.CHANGE'), '', {
          positionClass: 'toast-bottom-center',
        });
        this.navigation.back();
      })
  }

  showSettings(item: IArticleTemplate) {
    let schema = '';
    try {
      schema = JSON.stringify(item.sections, null, ' ');
    } catch (e){}

    this.dialog.open(SchemaDialogComponent, {
      data: {
        schema
      },
      width: '650px',
      maxHeight: 'fit-content',
      autoFocus: false,
      restoreFocus: false
    });
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
