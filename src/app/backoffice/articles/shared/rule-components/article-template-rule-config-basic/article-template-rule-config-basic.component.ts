import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-article-template-rule-config-basic',
  templateUrl: './article-template-rule-config-basic.component.html',
  styleUrls: ['./article-template-rule-config-basic.component.scss']
})
export class ArticleTemplateRuleConfigBasicComponent implements OnInit {

  description: string;
  formGroup: FormGroup;
  @Input() set control(control: FormGroup){
    this.formGroup = control;
  }
  constructor() { }

  ngOnInit(): void {
    const { data: { description = ''} } = this.formGroup.value;
    this.description = description;
  }

}
