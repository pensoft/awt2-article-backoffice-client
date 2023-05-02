import { Component } from '@angular/core';
import {
  ArticleTemplateRuleConfigBasicComponent
} from '../article-template-rule-config-basic/article-template-rule-config-basic.component';

@Component({
  selector: 'app-rule-config-min-max-section-instances',
  templateUrl: './rule-config-min-max-section-instances.component.html',
  styleUrls: ['./rule-config-min-max-section-instances.component.scss']
})
export class RuleConfigMinMaxSectionInstancesComponent extends ArticleTemplateRuleConfigBasicComponent{

  constructor() {
    super();
  }

  get expressions(){
    return this.formGroup.get('expressions').value;
  }

  expressionsChange($event: any) {
    this.formGroup.get('expressions').setValue($event)
  }
}
