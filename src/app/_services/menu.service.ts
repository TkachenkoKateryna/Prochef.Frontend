import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuResponse } from '../_models/response/menu.response.model';

const API_URL = 'https://prochefwebapi.azurewebsites.net/';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  private menu: MenuResponse;

  constructor(private http: HttpClient) { }

  getCurrentMenu(): Observable<any> {
    return this.http.get(API_URL + 'currentMenu');
  }
}
