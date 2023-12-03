import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Common } from './common';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }

  action(serviceName: string, parameter: any, isToken = false) {
    if (isToken) {
      return this.http.post(serviceName, parameter, {
        headers: new HttpHeaders({ access_token: Common.accessToken ?? "", })
      }).toPromise();
    } else {
      return this.http.post(serviceName, parameter).toPromise();
    }
  }

  actionObservable(serviceName: string, parameter: any, isToken = false) {
    if (isToken) {
      return this.http.post(serviceName, parameter, {
        headers: new HttpHeaders({ access_token: Common.accessToken ?? "", }),
        reportProgress: true, observe:"events"
      });
    } else {
      return this.http.post(serviceName, parameter, { reportProgress: true, observe: "events" } );
    }
  }
}
