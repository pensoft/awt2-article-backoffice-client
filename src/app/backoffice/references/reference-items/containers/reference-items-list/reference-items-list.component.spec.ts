import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceItemsListComponent } from './reference-items-list.component';

describe('ReferenceItemsListComponent', () => {
  let component: ReferenceItemsListComponent;
  let fixture: ComponentFixture<ReferenceItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceItemsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
