import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLayoutsListComponent } from './article-layouts-list.component';

describe('ArticleLayoutsListComponent', () => {
  let component: ArticleLayoutsListComponent;
  let fixture: ComponentFixture<ArticleLayoutsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleLayoutsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLayoutsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
