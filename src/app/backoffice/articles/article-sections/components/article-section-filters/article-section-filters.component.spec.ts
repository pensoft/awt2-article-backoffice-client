import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSectionFiltersComponent } from './article-section-filters.component';

describe('ArticleSectionFiltersComponent', () => {
  let component: ArticleSectionFiltersComponent;
  let fixture: ComponentFixture<ArticleSectionFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSectionFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSectionFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
