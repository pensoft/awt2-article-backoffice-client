import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleConfigMinMaxBasicComponent } from './rule-config-min-max-basic.component';

describe('ArticleTemplateSettingsConfigParameterComponent', () => {
  let component: RuleConfigMinMaxBasicComponent;
  let fixture: ComponentFixture<RuleConfigMinMaxBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleConfigMinMaxBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleConfigMinMaxBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
