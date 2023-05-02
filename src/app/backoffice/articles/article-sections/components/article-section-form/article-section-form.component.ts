import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleSectionListAdapter, IArticleSection } from '../../interfaces/article-sections.interface';
import { ArticleSectionTypes } from '../../enums/article-section-types';
import { SCHEMA_MODE, SchemaDialogComponent } from '../../../shared/components/schema-dialog/schema-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { filter, take } from 'rxjs/operators';
import { jsonValidator } from '@shared/validators/form-validators/json.validators';

@Component({
  selector: 'app-article-section-form',
  templateUrl: './article-section-form.component.html',
  styleUrls: ['./article-section-form.component.scss']
})
export class ArticleSectionFormComponent implements OnInit {
  formGroup: FormGroup;
  html: string;
  showHtml = false;
  form: Object = {components: []};
  @Input() section: IArticleSection;
  @Input() type: ArticleSectionTypes = ArticleSectionTypes.SIMPLE;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.setForm(this.section)
  }

  setForm(data?) {

    let form = data?.schema || (this.isCustom ? {} : {components: []});
    if(this.isCustom){
      form = JSON.stringify(form, null, 2)
    }
    this.form = form;
    this.html = data?.template || '';

    this.formGroup = this.fb.group({
      name: this.fb.control(data?.name || null, [Validators.required]),
      label: this.fb.control(data?.label || null, [Validators.required]),
      label_read_only: this.fb.control(data?.label_read_only || false),
      schema: this.fb.control(this.form || null, [Validators.required, jsonValidator]),
      sections: this.fb.control(data?.sections || null, [Validators.nullValidator]),
      template: this.fb.control(data?.template || null, [Validators.required]),
      type: this.fb.control(
        data?.type || this.type,
        [Validators.required]),
      compatibility: this.fb.control(data?.compatibility || null),
      allow_compatibility: this.fb.control(data?.allow_compatibility)
    });
  }

  get isComplex() {
    return this.type === ArticleSectionTypes.COMPLEX;
  }

  get isSimple() {
    return this.type === ArticleSectionTypes.SIMPLE;
  }

  get isCustom() {
    return this.type === ArticleSectionTypes.CUSTOM;
  }

  setFormData(data) {
    this.formGroup.get('schema').setValue(data)
  }

  setSectionsData(data) {
    this.formGroup.get('sections').setValue(data)
  }

  setCompatibilityData(data) {
    this.formGroup.get('compatibility').setValue(data)
  }

  setAllowCompatibility(data) {
    this.formGroup.get('allow_compatibility').setValue(data)
  }

  templateChange($event: any) {
    this.html = $event;
    this.formGroup.get('template').setValue(this.html)
  }

  tabChanged($event) {
    const tabIndex = this.isComplex ? 2 : 1;
    if (!this.showHtml && $event.index === tabIndex) {
      this.showHtml = true;
    }
  }

  public showSchema() {
    let schema = '';
    try {
      schema = JSON.stringify(this.formGroup.get('schema').value, null, ' ');
    } catch (e) {
    }

    this.dialog.open(SchemaDialogComponent, {
      data: {
        schema,
        readonly: SCHEMA_MODE.EDIT
      },
      width: '800px',
      maxHeight: 'fit-content',
      autoFocus: false,
      restoreFocus: false
    }).afterClosed()
      .pipe(
        filter(data => data),
        take(1)
      ).subscribe(data => {
      this.form = JSON.parse(data);
      this.setFormData(this.form);
    })
  }

  // return only unique IDs of the selected sections
  get currentlySelectedSections() {
    if (this.formGroup.get('sections').value instanceof Event) {
      return;
    }
    return (this.formGroup.get('sections').value || []).reduce((res, item) => [...new Set([...res, item.id])], []);
  }

  get isValid() {
    return this.formGroup.valid;
  }

  get values() {
    const result = this.formGroup.getRawValue();

    let { schema } = result;
    if(this.isCustom){
      schema = JSON.parse(schema);
    }
    return {...result, schema}
  }

  get selectedSections() {
    return (this.section?.sections || []).map(item => new ArticleSectionListAdapter(item));
  }
}
