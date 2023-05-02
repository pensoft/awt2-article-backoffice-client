import { InjectionToken } from '@angular/core';

export class AppConfig {
  formio: { username: string, password: string};
  production: boolean;
  authService: string;
  apiGatewayService: string;
  pkceClientId: string;
  pgClientId: string;
  pgClientSecret: string;
  articleApiVersion: string;
  eventDispatcherService: string;
}

export let APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG')
