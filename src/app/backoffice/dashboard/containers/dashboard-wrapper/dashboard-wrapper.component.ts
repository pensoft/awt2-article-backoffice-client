import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EchoService } from 'ngx-laravel-echo';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
  styleUrls: ['./dashboard-wrapper.component.scss']
})
export class DashboardWrapperComponent implements OnInit {

  constructor(private _http: HttpClient,
              private readonly echoService: EchoService,
              private _authservice: AuthService) { }

  ngOnInit(): void {
    const currentUserValue =  this._authservice.currentUserValue;
    const token = this._authservice.getToken();
    this.echoService.echo.connector.options.auth.headers['Authorization'] = 'Bearer ' + token;
    this.echoService
      .join(`task_manager:private-tasks.${currentUserValue.id}`, 'private')
      .listen(`task_manager:private-tasks.${currentUserValue.id}`, '.TaskCreatedEvent')
      .subscribe(data => console.log('TaskCreatedEvent',data))
  }

  getMe(){
      return this._http.get<any>(`/auth/me`).subscribe(data => console.log(data));
    }


}
