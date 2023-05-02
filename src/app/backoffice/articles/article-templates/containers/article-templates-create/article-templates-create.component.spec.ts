import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTemplatesCreateComponent } from './article-template-create.component';

describe('ArticleTemplateCreateComponent', () => {
  let component: ArticleTemplatesCreateComponent;
  let fixture: ComponentFixture<ArticleTemplatesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTemplatesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTemplatesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
