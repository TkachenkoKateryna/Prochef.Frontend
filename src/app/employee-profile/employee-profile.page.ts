import { Component, OnInit } from '@angular/core';
import { EmployeeResponseModel } from '../_models/response/register-employee.response.model';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.page.html',
  styleUrls: ['./employee-profile.page.scss'],
})
export class EmployeeProfilePage implements OnInit {
  currentUser: EmployeeResponseModel;

  constructor(
    private token: TokenStorageService, 
  ) {}

  ngOnInit() {
    this.currentUser = this.token.getUser();
  }
}
