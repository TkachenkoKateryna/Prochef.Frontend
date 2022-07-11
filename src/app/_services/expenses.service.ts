import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpensesResponse } from '../_models/response/expenses.responce.model';

const API_URL = 'https://prochefwebapi.azurewebsites.net/';

@Injectable({
  providedIn: 'root'
})

export class ExpensesService {
  private expenses: ExpensesResponse;

  constructor(private http: HttpClient) { }

  getWeekReport(startDate: string, endDate: string): Observable<any> {
    console.log(API_URL + 'expenses/getWeekReport?startDate=' + startDate + '&endDate=' + endDate);
    return this.http.get(API_URL + 'expenses/getWeekReport?startDate=' + startDate + '&endDate=' + endDate);
  }
}
