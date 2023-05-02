import { Component } from '@angular/core';
import {
  ArticleTemplateRuleConfigBasicComponent
} from '../article-template-rule-config-basic/article-template-rule-config-basic.component';

@Component({
  selector: 'app-rule-config-min-max-article-character',
  templateUrl: './rule-config-min-max-basic.component.html',
  styleUrls: ['./rule-config-min-max-basic.component.scss']
})
export class RuleConfigMinMaxBasicComponent extends ArticleTemplateRuleConfigBasicComponent {

  constructor() {
    super();
  }
}
