import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLayoutsTableComponent } from './article-layouts-table.component';

describe('ArticleLayoutsTableComponent', () => {
  let component: ArticleLayoutsTableComponent;
  let fixture: ComponentFixture<ArticleLayoutsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleLayoutsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLayoutsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
