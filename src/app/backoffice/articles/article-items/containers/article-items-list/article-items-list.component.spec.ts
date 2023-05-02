import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleItemsListComponent } from './article-items-list.component';

describe('ArticleItemsListComponent', () => {
  let component: ArticleItemsListComponent;
  let fixture: ComponentFixture<ArticleItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleItemsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
