import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTemplatesUpdateComponent } from './article-templates-update.component';

describe('ArticleTemplatesUpdateComponent', () => {
  let component: ArticleTemplatesUpdateComponent;
  let fixture: ComponentFixture<ArticleTemplatesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTemplatesUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTemplatesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
