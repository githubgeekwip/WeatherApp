import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";

import { environment } from '../../environments/environment';
import { error } from 'protractor';

//Injectable for injecting the service to components and WeatherService class members initialization
@Injectable()
export class WeatherService {

  //Injecting Http service from Angular
  constructor(private http: Http) { }


  //Returns Observable<any[]> after the service call
  getWeatherForecast(city: string): Observable<any[]> {
    return this.http
      .get(
        environment.baseUrl + city
      )
      .pipe(map(response =>
        this.extractData(response)));

  }

  //Groups the Array by date.
  //@Arr for Array to group
  //@key for grouping
  private groupBy(arr: any, key: string) {
    return arr.reduce((rv, x) => {
      const cDate = new Date(x[key] * 1000);
      const monthFormat = `${cDate.getMonth() +
        1}/${cDate.getDate()}/${cDate.getFullYear()}`;
      (rv[monthFormat] = rv[monthFormat] || []).push(x);
      return rv;
    }, {});
  }


  //Groups the returned group to 5 subgroups
  private extractData(res: any): any {
    let body = res.json();
    body = this.groupBy(body, 'dt');
    body = Object.values(body);
    return body.slice(0, 5);
  }
}
