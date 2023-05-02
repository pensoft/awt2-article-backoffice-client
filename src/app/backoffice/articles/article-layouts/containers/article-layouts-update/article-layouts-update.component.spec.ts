import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLayoutsUpdateComponent } from './article-layouts-update.component';

describe('ArticleLayoutUpdateComponent', () => {
  let component: ArticleLayoutsUpdateComponent;
  let fixture: ComponentFixture<ArticleLayoutsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleLayoutsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLayoutsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
