import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { jsonValidator } from '@shared/validators/form-validators/json.validators';

export enum SCHEMA_MODE {
  EDIT,
  READ_ONLY
}
@Component({
  selector: 'app-schema-dialog',
  templateUrl: './schema-dialog.component.html',
  styleUrls: ['./schema-dialog.component.scss']
})
export class SchemaDialogComponent implements OnInit{
  formGroup: FormGroup;
  show = false;
  schema: any;
  title = 'Schema';
  options = {
    theme: 'eclipse',
    mode: 'application/ld+json',
    json: true,
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: [
      'CodeMirror-linenumbers',
      'CodeMirror-foldgutter',
      'CodeMirror-lint-markers',
    ],
    autoCloseBrackets: true,
    matchBrackets: true,
    readOnly: true
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<SchemaDialogComponent>,
              private readonly fb: FormBuilder) {
    if(data.readonly !== undefined){
      this.options.readOnly = data.readonly;
    }
    if(data.title){
      this.title = data.title;
    }
    this.schema = data.schema;

  }

  ngOnInit() {
    this.setForm({
      schema: this.schema
    })

    setTimeout(() => this.show = true, 300);
  }

  setForm(data){
    this.formGroup = this.fb.group({
      schema: this.fb.control( data.schema, [jsonValidator]),
    })
  }

  get sectionSchema(){
    return  this.formGroup.get('schema').value;
  }

  setSectionSchema(data) {
    if(!data) {
      data = null;
    }

    this.formGroup.get('schema').setValue(data)
  }

  save(){
    this.dialogRef.close(this.sectionSchema);
  }
}
