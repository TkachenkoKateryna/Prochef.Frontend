import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResiterEmployeeRequest } from '../_models/request/register-employee-request.model';

const API_URL = 'https://prochefwebapi.azurewebsites.net/';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {   
    const body = new HttpParams()
      .set("login", email)
      .set("password", password);

    console.log(body);
    return  this.http.post(API_URL + 'employees/login', body);
  }
  
  register(request: ResiterEmployeeRequest): Observable<any> {
    const body = new HttpParams()
      .set("email", request.email)
      .set("password", request.password)
      .set("firstName", request.firstName)
      .set("middleName", request.middleName)
      .set("lastName", request.lastName)
      .set("restaurantId", request.restaurantId.toString())
      .set("roleId", request.roleId.toString());

      console.log(body);
    return this.http.post(API_URL + 'employees/register', body);
  }
}
