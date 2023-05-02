import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSectionFormComponent } from './article-section-form.component';

describe('ArticleSectionFormComponent', () => {
  let component: ArticleSectionFormComponent;
  let fixture: ComponentFixture<ArticleSectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSectionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
