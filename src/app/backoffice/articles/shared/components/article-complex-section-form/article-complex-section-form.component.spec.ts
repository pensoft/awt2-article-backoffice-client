import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComplexSectionFormComponent } from './article-complex-section-form.component';

describe('ArticleComplexSectionFormComponent', () => {
  let component: ArticleComplexSectionFormComponent;
  let fixture: ComponentFixture<ArticleComplexSectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleComplexSectionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComplexSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
