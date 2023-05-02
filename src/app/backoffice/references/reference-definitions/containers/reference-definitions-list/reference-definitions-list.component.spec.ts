import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDefinitionsListComponent } from './reference-definitions-list.component';

describe('ReferenceDefinitionsListComponent', () => {
  let component: ReferenceDefinitionsListComponent;
  let fixture: ComponentFixture<ReferenceDefinitionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceDefinitionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceDefinitionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
