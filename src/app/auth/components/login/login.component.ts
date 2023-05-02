import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { CONSTANTS } from '@core/services/constants';
import { UserModel } from '@core/models/user.model';
import { BroadcasterService } from '@core/services/broadcaster.service';
import { FormioBaseService } from '@core/services/formio-base.service';
import { APP_CONFIG, AppConfig } from '@core/services/app-config';
import { OauthClient } from '@shared/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
   returnUrl: string;
  isLoading$: Observable<boolean> = this._broadcaster.listen(CONSTANTS.SHOW_LOADER);

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private _broadcaster: BroadcasterService,
    public formioBaseService: FormioBaseService,
    @Inject(APP_CONFIG) private config: AppConfig,
    private readonly oauthClient: OauthClient
  ) {
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }




  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  async signIn() {
    try {
      const signInResult = await this.oauthClient.lpClient.signIn();
      await this.processSigninResult(signInResult);
    } catch (e) {
      console.log(e);
    }
  }


  async processSigninResult(signInResult){
    if(signInResult){
      const token = await this.oauthClient.lpClient.getToken();
      this.authService.storeToken(token);
      const loginSubscr = this.authService.getUserInfo(token).pipe(take(1))
        .subscribe((user: UserModel | undefined) => {
          if (user) {
            this.router.navigate(['/dashboard']);
            this.formioBaseService.login();
          }
        });
      this.unsubscribe.push(loginSubscr);
    }
  }

  get registerUrl(){
    return `${this.config.authService}/register?return_uri=${encodeURIComponent(window.location.href)}`
  }
}
