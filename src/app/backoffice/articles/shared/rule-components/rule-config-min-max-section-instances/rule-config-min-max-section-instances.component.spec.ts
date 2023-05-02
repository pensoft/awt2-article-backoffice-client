import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleConfigMinMaxSectionInstancesComponent } from './rule-config-min-max-section-instances.component';

describe('RuleConfigMinMaxSectionInstancesComponent', () => {
  let component: RuleConfigMinMaxSectionInstancesComponent;
  let fixture: ComponentFixture<RuleConfigMinMaxSectionInstancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleConfigMinMaxSectionInstancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleConfigMinMaxSectionInstancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
