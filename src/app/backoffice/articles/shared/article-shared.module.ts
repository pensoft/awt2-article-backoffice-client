import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ArticleComplexSectionFormComponent
} from './components/article-complex-section-form/article-complex-section-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InlineSVGModule } from 'ng-inline-svg';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import {
  ArticleTemplateSectionSettingsComponent
} from './components/article-template-section-settings/article-template-section-settings.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  ArticleTemplateSettingsComponent
} from './components/article-template-settings/article-template-settings.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  ArticleTemplateRuleConfigBasicComponent
} from './rule-components/article-template-rule-config-basic/article-template-rule-config-basic.component';
import {
  ArticleTemplateRuleConfigParameterComponent
} from './rule-components/article-template-rule-config-parameter/article-template-rule-config-parameter.component';
import {
  ArticleTemplateRuleConfigWrapperComponent
} from './components/article-template-rule-config-wrapper/article-template-rule-config-wrapper.component';
import { MatInputModule } from '@angular/material/input';
import {
  RuleConfigMinMaxBasicComponent
} from './rule-components/rule-config-min-max-basic/rule-config-min-max-basic.component';
import {
  RuleConfigMinMaxSectionInstancesComponent
} from './rule-components/rule-config-min-max-section-instances/rule-config-min-max-section-instances.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { SchemaDialogComponent } from './components/schema-dialog/schema-dialog.component';
import {
  RuleConfigPositionSectionsComponent
} from './rule-components/rule-config-position-sections/rule-config-position-sections.component';
import {
  ArticleSectionSettingsComponent
} from './components/article-section-settings/article-section-settings.component';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ChunkFileUploaderComponent } from './components/chunk-file-uploader/chunk-file-uploader.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';


@NgModule({
  declarations: [
    ArticleComplexSectionFormComponent,
    ArticleTemplateSectionSettingsComponent,
    ArticleTemplateSettingsComponent,
    ArticleTemplateRuleConfigBasicComponent,
    ArticleTemplateRuleConfigParameterComponent,
    ArticleTemplateRuleConfigWrapperComponent,
    RuleConfigMinMaxBasicComponent,
    RuleConfigMinMaxSectionInstancesComponent,
    RuleConfigPositionSectionsComponent,
    SchemaDialogComponent,
    ArticleSectionSettingsComponent,
    FileUploadComponent,
    ChunkFileUploaderComponent,
  ],
  exports: [
    ArticleComplexSectionFormComponent,
    ArticleTemplateSettingsComponent,
    FileUploadComponent,
    ChunkFileUploaderComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    InlineSVGModule,
    MatButtonModule,
    TranslateModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    CodemirrorModule,
    FormsModule,
    MatIconModule,
    NgxDropzoneModule,
    DropzoneModule
  ]
})
export class ArticleSharedModule { }
