import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSectionFiltersDdComponent } from './article-section-filters-dd.component';

describe('ArticleSectionFiltersDdComponent', () => {
  let component: ArticleSectionFiltersDdComponent;
  let fixture: ComponentFixture<ArticleSectionFiltersDdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSectionFiltersDdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSectionFiltersDdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
