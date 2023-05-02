import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLayoutsCreateComponent } from './article-layouts-create.component';

describe('ArticleLayoutCreateComponent', () => {
  let component: ArticleLayoutsCreateComponent;
  let fixture: ComponentFixture<ArticleLayoutsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleLayoutsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLayoutsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
