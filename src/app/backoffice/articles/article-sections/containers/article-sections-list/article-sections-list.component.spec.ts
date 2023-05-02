import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSectionsListComponent } from './article-sections-list.component';

describe('ArticleSectionsListComponent', () => {
  let component: ArticleSectionsListComponent;
  let fixture: ComponentFixture<ArticleSectionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSectionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSectionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
