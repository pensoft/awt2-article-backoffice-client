import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormManagerConfig, FormManagerIndexComponent, FormManagerService } from '@formio/angular/manager';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAuthService } from '@formio/angular/auth';
import { FormioBaseService } from '@core/services/formio-base.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent  extends FormManagerIndexComponent implements OnInit {
  @ViewChild('json') jsonElement?: ElementRef;
  @Output() change: EventEmitter<object> = new EventEmitter();
  @Input('form') form: Object = {components: []};
  options: any;
  onChange(event: any) {
    if(event?.form && ['addComponent','deleteComponent', 'saveComponent'].indexOf(event.type) > -1) {
      this.change.emit(event.form);
    }
  }
  constructor(
    public auth: FormioAuthService,
    public service: FormManagerService,
    public route: ActivatedRoute,
    public router: Router,
    public config: FormManagerConfig,
    public formioBaseService: FormioBaseService
  ) {
    super(service, route, router, config);
    this.options = options
    this.formioBaseService.login();
  }

  ngOnInit(): void {

  }
}

export const options = {
  builder: {
    premium: false
  },
  language: 'en',
  noDefaultSubmitButton: true
};

