import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComplexSectionSettings } from '../../interfaces/section-settings.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ArticleTemplateSectionSettingsComponent
} from '../article-template-section-settings/article-template-section-settings.component';

@Component({
  selector: 'app-article-section-settings',
  templateUrl: './article-section-settings.component.html',
  styleUrls: ['./article-section-settings.component.scss']
})
export class ArticleSectionSettingsComponent implements OnInit {
  formGroup: FormGroup;
  settings: object;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ArticleSectionSettingsComponent|ArticleTemplateSectionSettingsComponent>,
              public readonly fb: FormBuilder) {
    this.settings = data.settings;
  }

  ngOnInit(): void {
    this.buildTheForm(new ComplexSectionSettings(this.settings));
  }

  buildTheForm(settings){
    this.formGroup = this.fb.group({
      min_instances: this.fb.control(settings?.min_instances),
      max_instances: this.fb.control(settings?.max_instances),
      label: this.fb.control(settings?.label),
    })
  }

  save() {
    this.dialogRef.close(this.formGroup.getRawValue());
  }
}
