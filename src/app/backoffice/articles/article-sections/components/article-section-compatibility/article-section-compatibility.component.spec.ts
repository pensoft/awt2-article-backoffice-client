import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSectionCompatibilityComponent } from './article-section-compatibility.component';

describe('ArticleSectionParticipatingComponent', () => {
  let component: ArticleSectionCompatibilityComponent;
  let fixture: ComponentFixture<ArticleSectionCompatibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSectionCompatibilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSectionCompatibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
