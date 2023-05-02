import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HTTPReqResInterceptor } from '@core/services/http-req-res.interceptor';
import { CoreModule } from '@core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@core/services/auth.service';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { HttpErrorInterceptor } from '@core/services/http-error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { FormioAppConfig, FormioModule } from '@formio/angular';
import { FormBuilderConfig } from './backoffice/articles/article-sections/components/form-builder/form-builder-config';
import { FormioAuthConfig, FormioAuthService } from '@formio/angular/auth';
import { FormManagerConfig, FormManagerService } from '@formio/angular/manager';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NavigationService } from '@core/services/navigation.service';
import { ECHO_CONFIG, EchoService } from 'ngx-laravel-echo';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { APP_CONFIG, AppConfig } from '@core/services/app-config';


function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      authService.getUserInfo().subscribe().add(resolve);
    });
  };
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DropzoneModule,
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot(),
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    FormioModule,
    ToastrModule.forRoot(),
    CodemirrorModule
  ],
  providers: [
    EchoService,
    {
      provide: ECHO_CONFIG,
      deps:[AppConfig],
      useFactory: (config: AppConfig) => ({
          userModel: 'users',
          notificationNamespace: 'App\\Notifications',
          options: {
            broadcaster: 'socket.io',
            host: config.eventDispatcherService,
          }
      })
    },
    {
      provide: 'API_GATEWAY_SERVICE',
      useFactory: (config: AppConfig) => config.apiGatewayService,
      deps: [AppConfig]
    },
    {
      provide: 'AUTH_SERVICE',
      useFactory: (config: AppConfig) => config.authService,
      deps: [AppConfig]
    },
    {
      provide: APP_CONFIG,
      useFactory: (config: AppConfig) => config,
      deps: [AppConfig]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPReqResInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: FormioAppConfig,
      useValue: FormBuilderConfig
    },
    FormioAuthService,
    {
      provide: FormioAuthConfig, useValue: {
        login: {
          form: 'user/login'
        },
        register: {
          form: 'user/register'
        }
      }
    },

    FormManagerService,
    {
      provide: FormManagerConfig, useValue: {
        tag: 'form'
      }
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => null,
      deps: [NavigationService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
