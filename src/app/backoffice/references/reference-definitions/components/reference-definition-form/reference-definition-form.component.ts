import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IReferenceDefinition } from '../../interfaces/reference-definition.interface';
import { jsonValidator } from '@shared/validators/form-validators/json.validators';

@Component({
  selector: 'app-reference-definition-form',
  templateUrl: './reference-definition-form.component.html',
  styleUrls: ['./reference-definition-form.component.scss']
})
export class ReferenceDefinitionFormComponent implements OnInit {
  formGroup: FormGroup;
  showSettings = false;
  html: string;
  form: Object = {components: []};
  settings: Object = {};
  @Input() item: IReferenceDefinition;
  constructor(private readonly fb: FormBuilder,
              private readonly route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.setForm(this.item)
  }

  setForm(data?) {
    this.form = data?.schema ||  {components: []};
    this.settings = data?.settings || {};

      try {
        this.settings = JSON.stringify(this.settings,null, 2);
      } catch (e){

      }


    this.formGroup = this.fb.group({
      title: this.fb.control(data?.title || null, [Validators.required]),
      type: this.fb.control(data?.type || null, [Validators.required]),
      schema: this.fb.control(this.form || null, [Validators.required, jsonValidator]),
      settings: this.fb.control(this.settings || null, [jsonValidator]),
    });
  }

  setFormData(data) {
    this.formGroup.get('schema').setValue(data)
  }

  setSettingsData(data) {
    if(!data) {
      data = null;
    }
    this.formGroup.get('settings').setValue(data)
  }

  tabChanged($event) {
    const tabIndex = 1;
    if (!this.showSettings && $event.index === tabIndex) {
      this.showSettings = true;
    }
  }

  get isValid() {
    return this.formGroup.valid;
  }

  get values() {
    const parameters =  this.formGroup.getRawValue();
    return {
      ...parameters,
      ...(parameters.settings && {settings: JSON.parse(parameters.settings)})
    };
  }
}
