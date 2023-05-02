import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTemplateRuleConfigParameterComponent } from './article-template-rule-config-parameter.component';

describe('ArticleTemplateSettingsConfigParameterComponent', () => {
  let component: ArticleTemplateRuleConfigParameterComponent;
  let fixture: ComponentFixture<ArticleTemplateRuleConfigParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTemplateRuleConfigParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTemplateRuleConfigParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
