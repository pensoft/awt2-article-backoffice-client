import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLayoutFormComponent } from './article-layout-form.component';

describe('ArticleLayoutFormComponent', () => {
  let component: ArticleLayoutFormComponent;
  let fixture: ComponentFixture<ArticleLayoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleLayoutFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLayoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
