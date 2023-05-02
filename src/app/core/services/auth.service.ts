import { IAuthToken, IUserDetail } from '@core/interfaces/auth.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { CONSTANTS } from './constants';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserModel } from '@core/models/user.model';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { APP_CONFIG, AppConfig } from '@core/services/app-config';


export type UserType = UserModel | undefined;

@Injectable({providedIn: 'root'})
export class AuthService implements OnDestroy {
  private headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  private unsubscribe$ = new Subject<void>();
  currentUser$: Observable<UserType>;
  currentUserSubject: BehaviorSubject<UserType>;
  API_AUTH_URL = `/auth`;

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(private _http: HttpClient,
              private router: Router,
              @Inject('AUTH_SERVICE') private _authService: string,
              @Inject(APP_CONFIG) private config: AppConfig,
              ) {
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.API_AUTH_URL = `${this._authService}/api`;
  }

  login(userdetails: IUserDetail) {
    const body = new HttpParams()
      .set(CONSTANTS.USERNAME, userdetails.username)
      .set(CONSTANTS.PASSWORD, userdetails.password)
      .set(CONSTANTS.GRANT_TYPE, CONSTANTS.PASSOWRD_GRANT_TYPE)
      .set(CONSTANTS.CLIENT_ID, this.config.pgClientId)
      .set(CONSTANTS.CLIENT_SECRET, this.config.pgClientSecret);

    return this._http.post<IAuthToken>(`${this.API_AUTH_URL }/token`, body.toString(), {
      headers: this.headers,
    }).pipe(
      map(resp => {
        this.storeToken(resp.access_token);
        this.storeToken(resp.refresh_token, 'refreshToken');
        return resp;
      }),
      switchMap(() => this.getUserInfo()),
      catchError((err) => {
        return of(undefined);
      })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login'])
  }

  invalidateToken(){
    this._http.post(`${this.API_AUTH_URL }/logout`, {}, {headers: this.headers})
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        complete: () => {
          this.logout();
        },
        error: () => {
          this.logout();
        },
      });
  }

  isLoggedIn() {
    return !!this.getToken(); // add your strong logic
  }

  storeToken(token: string, key = 'token') {
    if(token) {
      localStorage.setItem(key, token);
    }
  }

  getToken(key = 'token') {
    return localStorage.getItem(key);
  }

  refreshToken() {
    const refreshToken = this.getToken('refreshToken');
    const body = new HttpParams()
      .set(CONSTANTS.REFRESH_TOKEN_GRANT_TYPE, refreshToken)
      .set(CONSTANTS.GRANT_TYPE, CONSTANTS.REFRESH_TOKEN_GRANT_TYPE)
      .set(CONSTANTS.CLIENT_ID, this.config.pgClientId)
      .set(CONSTANTS.CLIENT_SECRET, this.config.pgClientSecret);

    return this._http.post<any>(`${this.API_AUTH_URL }/refresh-token`, body.toString())
      .pipe(
        map(({access_token: token, refresh_token: refreshToken}) =>
          ({
              token,
              refreshToken
        })
      ))
  }

  forgotPassword(email: string): Observable<boolean> {
    return this._http.post<boolean>(`${this.API_AUTH_URL }/forgot-password`, {
      email,
    });
  }

  getUserInfo(token = null) {
    const auth = token || this.getToken();
    this.storeToken(auth);

    if (!auth) {
      return of(undefined);
    }

    return this._http.get<any>(`${this.API_AUTH_URL }/me`)
      .pipe(
        map((user) => {
          if (user) {
            this.currentUserSubject.next(user.data);
          } else {
            this.logout();
          }
          return user;
        }),

      )
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
