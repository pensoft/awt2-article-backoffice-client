import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectionSettings } from '../../interfaces/section-settings.interface';
import { ArticleSectionSettingsComponent } from '../article-section-settings/article-section-settings.component';

@Component({
  selector: 'app-article-template-section-settings',
  templateUrl: './article-template-section-settings.component.html',
  styleUrls: ['./article-template-section-settings.component.scss']
})
export class ArticleTemplateSectionSettingsComponent implements OnInit {
  formGroup: FormGroup;
  settings: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ArticleTemplateSectionSettingsComponent|ArticleSectionSettingsComponent>,
              public readonly fb: FormBuilder) {
    this.settings = data.settings;
  }

  ngOnInit(): void {
    this.buildTheForm(new SectionSettings(this.settings));
  }

  buildTheForm(settings){
    this.formGroup = this.fb.group({
      main_section: this.fb.control(settings?.main_section, [Validators.required]),
      min_instances: this.fb.control(settings?.min_instances),
      max_instances: this.fb.control(settings?.max_instances),
      label: this.fb.control(settings?.label),
    })

    /*const updateValueAndValidityForMinInstances = (checked) => {
      if(checked){
        this.formGroup.get('min_instances').setValidators([Validators.required, Validators.min(1)]);
      } else {
        this.formGroup.get('min_instances').setValidators(null);
      }
      this.formGroup.get('min_instances').updateValueAndValidity()
    }

    this.formGroup.get('main_section').valueChanges.subscribe(checked => {
      updateValueAndValidityForMinInstances(checked);
    })

    updateValueAndValidityForMinInstances(settings?.main_section);*/
  }



  save() {
    this.dialogRef.close(this.formGroup.getRawValue());
  }
}
