import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ITemplateSettings } from '../../../shared/interfaces';
import { IArticleLayout } from '../../interfaces/article-layouts.interface';
import {
  ArticleTemplateSettingsComponent
} from '../../../shared/components/article-template-settings/article-template-settings.component';
import { ActivatedRoute } from '@angular/router';
import { map, startWith, take, takeUntil } from 'rxjs/operators';
import {
  ArticleTemplateListAdapter,
  IArticleTemplate
} from '../../../article-templates/interfaces/article-templates.interface';
import { Observable, Subject } from 'rxjs';
import { jsonValidator } from '@shared/validators/form-validators/json.validators';
import { CitationStyleAdapter } from '../../../shared/interfaces/citation-style.interface';

@Component({
  selector: 'app-article-layout-form',
  templateUrl: './article-layout-form.component.html',
  styleUrls: ['./article-layout-form.component.scss']
})
export class ArticleLayoutFormComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  formGroup: FormGroup;
  defaultRules: ITemplateSettings[] = []
  templates: ArticleTemplateListAdapter[] = [];
  selectedTemplate: IArticleTemplate;
  filteredTemplateOptions: Observable<ArticleTemplateListAdapter[]>;
  searchTemplate = new FormControl();

  citationStyles: CitationStyleAdapter[] = [];
  searchCitationStyle = new FormControl();
  selectedCitationStyle: CitationStyleAdapter;
  filteredCitationStyleOptions: Observable<CitationStyleAdapter[]>;

  versions: string[] = [];
  templateVersions = new Map();
  @Input() layout: IArticleLayout;
  @ViewChild(ArticleTemplateSettingsComponent, { static: false }) articleTemplateSettingsForm: ArticleTemplateSettingsComponent;


  constructor(private readonly fb: FormBuilder,
              private readonly route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe((data) => {
      this.templates = data.templates;
      this.citationStyles = data.citationStyles;
      this.setTemplateVersions(this.templates);

      this.setForm(this.layout);
      this.defaultRules = this.layout?.rules || [];
      if(this.layout) {
        this.selectedTemplate = this.layout.template;
      }
    });

    this.filteredTemplateOptions = this.searchTemplate.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.templates.slice())),
    );

    this.filteredCitationStyleOptions = this.searchCitationStyle.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.title)),
      map(title => (title ? this._filterCitationStyle(title) : this.citationStyles.slice())),
    );
  }

  setForm(data?){
    let settings = data?.settings;
    if(settings) {
      try {
        settings = JSON.stringify(settings,null, 2);
      } catch (e){

      }
    }

    this.formGroup = this.fb.group({
      name: this.fb.control(data?.name || null, [Validators.required]),
      schema_settings: this.fb.control(data?.schema_settings || null),
      settings: this.fb.control(settings, [jsonValidator]),
      article_template_id: this.fb.control(data?.template?.id || '', [Validators.required]),
      citation_style_id: this.fb.control(data?.citation_style?.id || '', [Validators.required]),
      article_template_version: this.fb.control(data?.template_version || ''),
      rules: this.fb.control([])
    })

    this.formGroup.get('article_template_id')
      .valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(articleTemplateId => {

        if(this.layout && this.layout.template.id === articleTemplateId){
          this.selectedTemplate = this.layout.template;
          this.defaultRules = this.layout.rules || [];
        } else {
          this.selectedTemplate = this.templates.find(template => template.id === articleTemplateId)
          this.defaultRules = this.selectedTemplate?.rules || [];
        }
        this.setVersions(this.selectedTemplate.id);
        this.setLatestVersion();
        this.filterItem('');
      })

    this.setVersions(data?.template?.id);
    if(!data?.template?.id){
      this.formGroup.get('article_template_version').disable();
    }
  }

  setVersions(templateId, isNull = false){
    this.versions = this.templateVersions.get(templateId) ?? [];

  }

  setLatestVersion(isNull = false){
    if(!this.versions.length){
      this.formGroup.get('article_template_version').disable();
    } else {
      this.formGroup.get('article_template_version').setValue(this.versions[0]);
      this.formGroup.get('article_template_version').enable();
    }
  }

  setTemplateVersions(templates){
    templates.forEach(template => {
      this.templateVersions.set(template.id, Array.from({length: template.version}, (v, k) => k+1).reverse())
    })
  }

  get schemaSettings(){
    return this.formGroup.get('schema_settings').value;
  }

  get layoutSettings(){
    return this.formGroup.get('settings').value;
  }

  setLayoutSettings(data) {
    if(!data) {
      data = null;
    }
    this.formGroup.get('settings').setValue(data)
  }

  setFormData(data, key = 'rules') {
    this.formGroup.get(key).setValue(data)
  }

  get isValid() {
    return this.formGroup.valid && this.articleTemplateSettingsForm && this.articleTemplateSettingsForm.isValid;
  }

  get values(){
    const parameters = this.formGroup.getRawValue();
    return {
      ...parameters,
      ...(parameters.settings && {settings: JSON.parse(parameters.settings)})
    };
  }

  displayFn(template: ArticleTemplateListAdapter): string {
    return template && template.name ? template.name : '';
  }

  private _filter(name: string): ArticleTemplateListAdapter[] {
    const filterValue = name.toLowerCase();

    return this.templates.filter(template => template.name.toLowerCase().includes(filterValue));
  }

  private _filterCitationStyle(title: string): CitationStyleAdapter[] {
    const filterValue = title.toLowerCase();

    return this.citationStyles.filter(template => template.title.toLowerCase().includes(filterValue));
  }

  filterItem(value) {
    this.searchTemplate.setValue(value);
  }

  filterCitationStyleItem(value) {
    this.searchCitationStyle.setValue(value);
  }
}
