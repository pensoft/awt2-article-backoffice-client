import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTemplatesTableComponent } from './article-templates-table.component';

describe('ArticleTemplatesTableComponent', () => {
  let component: ArticleTemplatesTableComponent;
  let fixture: ComponentFixture<ArticleTemplatesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTemplatesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTemplatesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
