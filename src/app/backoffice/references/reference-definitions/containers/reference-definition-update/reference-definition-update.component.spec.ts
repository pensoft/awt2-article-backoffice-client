import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDefinitionUpdateComponent } from './reference-definition-update.component';

describe('ReferenceDefinitionUpdateComponent', () => {
  let component: ReferenceDefinitionUpdateComponent;
  let fixture: ComponentFixture<ReferenceDefinitionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceDefinitionUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceDefinitionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
