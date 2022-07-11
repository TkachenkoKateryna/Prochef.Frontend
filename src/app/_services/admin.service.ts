import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://prochefwebapi.azurewebsites.net/';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any> {
    return this.http.get(API_URL + 'admin/getUsers');
  }

  getEmployee(email: string): Observable<any> {
    return this.http.get(API_URL + 'employee?email='+ email);
  }

  banEmployee(email: string): Observable<any>{
    const body = new HttpParams().set("email", email)
    return this.http.post(API_URL + 'admin/banUser', body);
  }

  discardBanEmployee(email: string): Observable<any>{
    const body = new HttpParams().set("email", email)
    return this.http.post(API_URL + 'admin/discardBanUser', body);
  }
}
