import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IArticleTemplate } from '../../interfaces/article-templates.interface';
import { ArticleSectionListAdapter } from '../../../article-sections/interfaces/article-sections.interface';
import { ITemplateSettings } from '../../../shared/interfaces/template-rules.interface';
import {
  ArticleTemplateSettingsComponent
} from '../../../shared/components/article-template-settings/article-template-settings.component';

@Component({
  selector: 'app-article-template-form',
  templateUrl: './article-template-form.component.html',
  styleUrls: ['./article-template-form.component.scss']
})
export class ArticleTemplateFormComponent implements OnInit {
  formGroup: FormGroup;
  defaultRules: ITemplateSettings[] = []
  @Input() template: IArticleTemplate;
  @ViewChild(ArticleTemplateSettingsComponent, { static: true }) articleTemplateSettingsForm: ArticleTemplateSettingsComponent;

  constructor(
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.setForm(this.template);
    this.defaultRules = this.template?.rules || [];
  }

  setForm(data?){
    this.formGroup = this.fb.group({
      name: this.fb.control(data?.name || null, [Validators.required]),
      schema: this.fb.control(data?.sections || [], [Validators.required]),
      settings: this.fb.control(data?.settings || {}),
      rules: this.fb.control([])
    })
  }

  setFormData(data, key = 'schema') {
    this.formGroup.get(key).setValue(data)
  }

  get isValid() {
    return this.formGroup.valid && this.articleTemplateSettingsForm && this.articleTemplateSettingsForm.isValid;
  }

  get values(){
    return this.formGroup.getRawValue();
  }

  get selectedSections(){
    return (this.template?.sections || []).map(item => new ArticleSectionListAdapter(item));
  }
}
