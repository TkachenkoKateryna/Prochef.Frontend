import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ResiterEmployeeRequest } from '../_models/request/register-employee-request.model';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  isLogin = false;
  isLoading = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }

    let request = new ResiterEmployeeRequest(
      form.value.firstname,
      form.value.middlename,
      form.value.lastname,
      +form.value.role,
      form.value.email,
      form.value.password,
      +form.value.restaurantId
    );

    console.log(request);
    this.authService.register(request).subscribe(
      data => {
        this.isSuccessful = true;
        this.navigateToProducts();
      },
       err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );;
    }

  navigateToProducts(){
    this.router.navigate(['/login'])
  }
}

