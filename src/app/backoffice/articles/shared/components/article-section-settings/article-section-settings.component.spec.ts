import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSectionSettingsComponent } from './article-section-settings.component';

describe('ArticleSectionSettingsComponent', () => {
  let component: ArticleSectionSettingsComponent;
  let fixture: ComponentFixture<ArticleSectionSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSectionSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSectionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
