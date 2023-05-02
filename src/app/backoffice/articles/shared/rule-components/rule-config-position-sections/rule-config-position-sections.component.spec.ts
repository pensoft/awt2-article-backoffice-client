import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleConfigPositionSectionsComponent } from './rule-config-position-sections.component';

describe('RuleConfigMinMaxSectionInstancesComponent', () => {
  let component: RuleConfigPositionSectionsComponent;
  let fixture: ComponentFixture<RuleConfigPositionSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleConfigPositionSectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleConfigPositionSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
