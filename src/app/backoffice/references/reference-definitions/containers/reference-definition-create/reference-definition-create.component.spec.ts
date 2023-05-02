import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDefinitionCreateComponent } from './reference-definition-create.component';

describe('ReferenceDefinitionCreateComponent', () => {
  let component: ReferenceDefinitionCreateComponent;
  let fixture: ComponentFixture<ReferenceDefinitionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceDefinitionCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceDefinitionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
