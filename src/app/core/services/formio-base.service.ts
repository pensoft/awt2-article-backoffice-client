import { Inject, Injectable } from '@angular/core';
import { FormioAuthService } from '@formio/angular/auth';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfig } from '../../backoffice/articles/article-sections/components/form-builder/form-builder-config';
import { APP_CONFIG, AppConfig } from '@core/services/app-config';

@Injectable({
  providedIn: 'root',
})
export class FormioBaseService {

  constructor(public formioAuthService: FormioAuthService,
              private http: HttpClient,
              @Inject(APP_CONFIG) private config: AppConfig) { }

  login(){
    const { username, password } = this.config.formio;
    this.formioAuthService.onLoginSubmit({data: {email: username, password, submit: true}})
  }

  create(payload){
    this.http.post(`${FormBuilderConfig.appUrl}/form`, payload)
  }
}
