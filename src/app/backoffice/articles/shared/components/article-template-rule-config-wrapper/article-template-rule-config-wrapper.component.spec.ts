import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTemplateRuleConfigWrapperComponent } from './article-template-rule-config-wrapper.component';

describe('ArticleTemplateSettingsConfigWrapperComponent', () => {
  let component: ArticleTemplateRuleConfigWrapperComponent;
  let fixture: ComponentFixture<ArticleTemplateRuleConfigWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTemplateRuleConfigWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTemplateRuleConfigWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
