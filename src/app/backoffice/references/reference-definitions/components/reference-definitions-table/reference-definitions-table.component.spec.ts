import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDefinitionsTableComponent } from './reference-definitions-table.component';

describe('ReferenceDefinitionsTableComponent', () => {
  let component: ReferenceDefinitionsTableComponent;
  let fixture: ComponentFixture<ReferenceDefinitionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceDefinitionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceDefinitionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
