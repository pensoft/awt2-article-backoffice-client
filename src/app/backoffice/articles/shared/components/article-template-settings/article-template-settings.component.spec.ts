import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTemplateSettingsComponent } from './article-template-settings.component';

describe('ArticleTemplateSettingsComponent', () => {
  let component: ArticleTemplateSettingsComponent;
  let fixture: ComponentFixture<ArticleTemplateSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTemplateSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTemplateSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
