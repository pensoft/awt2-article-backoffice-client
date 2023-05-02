import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTemplatesListComponent } from './article-templates-list.component';

describe('ArticleTemplatesListComponent', () => {
  let component: ArticleTemplatesListComponent;
  let fixture: ComponentFixture<ArticleTemplatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTemplatesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTemplatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
