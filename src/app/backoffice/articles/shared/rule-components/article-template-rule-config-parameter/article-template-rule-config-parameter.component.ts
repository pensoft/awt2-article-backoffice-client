import { Component } from '@angular/core';
import {
  ArticleTemplateRuleConfigBasicComponent
} from '../article-template-rule-config-basic/article-template-rule-config-basic.component';

@Component({
  selector: 'app-article-template-settings-config-parameter',
  templateUrl: './article-template-rule-config-parameter.component.html',
  styleUrls: ['./article-template-rule-config-parameter.component.scss']
})
export class ArticleTemplateRuleConfigParameterComponent extends ArticleTemplateRuleConfigBasicComponent {

  constructor() {
    super();
  }
}
