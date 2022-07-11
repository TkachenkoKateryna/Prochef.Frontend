import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ExpensesService } from '../_services/expenses.service';
import { NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ExpenseProductResponse } from '../_models/response/expense-product.model';
import { DailyExpensesResponseModel } from '../_models/response/daily-expences-response.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})

export class StatisticsPage implements  OnInit {
  products: ExpenseProductResponse[];
  productExpenses: number[];
  productNames: string[];
  dailyExpenses: DailyExpensesResponseModel[];
  weekExpenses: number[];
  startDate: string;
  endDate: string;

  bars: any;
  line: any;
  colorArray: any;

  @ViewChild('barChart') barChart;
  @ViewChild('lineChart') lineChart;
  @ViewChild('f', {static: true}) form: NgForm;

  constructor(private expensesService: ExpensesService) { }

  ngOnInit() {
    const TIME_SPAN = 6 * 24 * 60 * 60 * 1000;
    this.startDate = new Date("2020-11-02").toISOString();
    this.endDate = new Date(
      new Date(this.startDate)
      .getTime() + TIME_SPAN).toISOString();
  }

  public async getData(){
    this.expensesService.getWeekReport(
      formatDate(this.startDate, 'yyyy-MM-dd', 'en'), 
      formatDate(this.endDate, 'yyyy-MM-dd', 'en'))
      .subscribe(
        data => {
        this.products = data.products;
        this.productExpenses = this.products.map(ex => ex.totalAmount);
        this.productNames = this.products.map(ex => ex.productName.toLocaleString());
        this.dailyExpenses = data.totalDailyExpenses;
        this.weekExpenses = this.dailyExpenses.map(ex => ex.totalAmount);
      });
  }

  onSetDates(){
    this.getData();
    this.createBarChart();
    this.createPieChart();
  }

  datesValid(){
    const startDate = new Date(this.form.value['date-from']);
    const endDate = new Date(this.form.value['date-to']);
    return startDate < endDate;
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Понеділок', 'Вівторок', 'Середа', 'Четверг','Пятниця', 'Субота','Неділя'],
        datasets: [{
          label: '',
          data: this.weekExpenses,
          backgroundColor: this.generateColorArray(7), 
          borderColor: this.generateColorArray(7),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createPieChart() {
    this.line = new Chart(this.lineChart.nativeElement, {
      type: 'pie',
      data: {
        labels: this.productNames,
        datasets: [{
          label: '',
          data: this.productExpenses,
          backgroundColor: this.generateColorArray(3), 
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  generateColorArray(num: number) {
    const RAND_NUMBER = 16777215;
    let colorArray = new Array();
    for (let i = 0; i < num; i++) {
      let color = ('#' + Math.floor(Math.random() * RAND_NUMBER).toString(16)).toLocaleString();
      colorArray.push(color);
    }
    return colorArray;
   }
}



