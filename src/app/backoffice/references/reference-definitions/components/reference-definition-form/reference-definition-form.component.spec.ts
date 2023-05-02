import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDefinitionFormComponent } from './reference-definition-form.component';

describe('ReferenceDefinitionFormComponent', () => {
  let component: ReferenceDefinitionFormComponent;
  let fixture: ComponentFixture<ReferenceDefinitionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceDefinitionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceDefinitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
