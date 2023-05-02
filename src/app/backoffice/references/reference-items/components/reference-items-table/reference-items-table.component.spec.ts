import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceItemsTableComponent } from './reference-items-table.component';

describe('ReferenceItemsTableComponent', () => {
  let component: ReferenceItemsTableComponent;
  let fixture: ComponentFixture<ReferenceItemsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceItemsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
