import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSectionsTableComponent } from './article-sections-table.component';

describe('ArticleSectionsTableComponent', () => {
  let component: ArticleSectionsTableComponent;
  let fixture: ComponentFixture<ArticleSectionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSectionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSectionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
