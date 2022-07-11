import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeResponseModel } from '../_models/response/register-employee.response.model';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  username: string;
  PageTitle: string;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUser().username;
    }
  }

  onSubmit(form: NgForm) {
    this.authService.login(form.value.email, form.value.password)
    .pipe()
    .subscribe(data => {
      console.log(data);
      console.log(data.accessToken);
      this.tokenStorage.saveToken(data.accessToken);
        this.isLoginFailed = false;
        console.log(this.isLoggedIn);
        this.isLoggedIn = true;
        this.tokenStorage.saveUser(new EmployeeResponseModel(data.firstName, data.middleName, data.lastName, data.roleId, data.restaurantId, data.ban, data.email));
        this.navigateToProducts();
      }, error => {
      this.errorMessage = error.error.error_description;
      this.isLoginFailed = true;
    });
  }

  navigateToProducts(){
      this.router.navigate(['/employee-profile'])
  }
}
