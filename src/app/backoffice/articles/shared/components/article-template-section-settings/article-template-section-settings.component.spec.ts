import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTemplateSectionSettingsComponent } from './article-template-section-settings.component';

describe('ArticleTemplateSectionSettingsComponent', () => {
  let component: ArticleTemplateSectionSettingsComponent;
  let fixture: ComponentFixture<ArticleTemplateSectionSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTemplateSectionSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTemplateSectionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
