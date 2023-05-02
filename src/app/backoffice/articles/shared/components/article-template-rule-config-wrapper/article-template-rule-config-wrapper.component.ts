import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {
  ArticleTemplateRuleConfigBasicComponent
} from '../../rule-components/article-template-rule-config-basic/article-template-rule-config-basic.component';
import {
  ArticleTemplateRuleConfigParameterComponent
} from '../../rule-components/article-template-rule-config-parameter/article-template-rule-config-parameter.component';
import { ArticleTemplateSettingsConfigDto } from '../../interfaces/template-rules.interface';
import {
  RuleConfigMinMaxBasicComponent
} from '../../rule-components/rule-config-min-max-basic/rule-config-min-max-basic.component';
import {
  RuleConfigMinMaxSectionInstancesComponent
} from '../../rule-components/rule-config-min-max-section-instances/rule-config-min-max-section-instances.component';
import {
  RuleConfigPositionSectionsComponent
} from '../../rule-components/rule-config-position-sections/rule-config-position-sections.component';

@Component({
  selector: 'app-article-template-rule-config-wrapper',
  templateUrl: './article-template-rule-config-wrapper.component.html',
  styleUrls: ['./article-template-rule-config-wrapper.component.scss']
})
export class ArticleTemplateRuleConfigWrapperComponent implements OnInit {
  private readonly components = {
    ['RuleConfigBasic']: ArticleTemplateRuleConfigBasicComponent,
    ['RuleConfigParameter']: ArticleTemplateRuleConfigParameterComponent,
    ['RuleConfigMinMaxBasic']: RuleConfigMinMaxBasicComponent,
    ['RuleConfigMinMaxSectionInstances']: RuleConfigMinMaxSectionInstancesComponent,
    ['RuleConfigPositionSections']: RuleConfigPositionSectionsComponent,
  };

  @Input() ruleKeys;
  @Input() control: any;
  @ViewChild('container', {read: ViewContainerRef, static: true }) entry: ViewContainerRef;
  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    const component = this.components[this.ruleKeys[this.control.get('data').value.key]];
    this.setComponent(component, this.control)
  }

  setComponent(component, control) {
    try {
    const factory = this.resolver.resolveComponentFactory(component);
    const componentRef = this.entry.createComponent(factory);

    (<ArticleTemplateSettingsConfigDto>componentRef.instance).control = this.control;
    } catch (error) {
      console.log(error);
    }
  }
}
