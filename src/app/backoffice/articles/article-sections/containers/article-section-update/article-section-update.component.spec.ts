import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSectionUpdateComponent } from './article-section-update.component';

describe('ArticleSectionUpdateComponent', () => {
  let component: ArticleSectionUpdateComponent;
  let fixture: ComponentFixture<ArticleSectionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSectionUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSectionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
