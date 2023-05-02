import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTemplateRuleConfigBasicComponent } from './article-template-rule-config-basic.component';

describe('ArticleTemplateSettingsConfigBasicComponent', () => {
  let component: ArticleTemplateRuleConfigBasicComponent;
  let fixture: ComponentFixture<ArticleTemplateRuleConfigBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTemplateRuleConfigBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTemplateRuleConfigBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
