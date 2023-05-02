import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSectionCreateComponent } from './article-section-create.component';

describe('ArticleSectionCreateComponent', () => {
  let component: ArticleSectionCreateComponent;
  let fixture: ComponentFixture<ArticleSectionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSectionCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSectionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
