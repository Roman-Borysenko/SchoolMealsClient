import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { element } from 'protractor';
import { environment } from 'src/environments/environment';
import { RequestService } from '../services/request.service';

export interface AuthUser {
  name: string,
  email: string,
  token: string
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  env = environment;

  faUser = faUser;
  faLock = faLock;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  errorsToDisplay: Map<string, []> = new Map<string, []>();

  errorMessages: any = {
    email: 'Введіть коректний email!' ,
    minlength: function (length: number) { return "Довжина пароля повинна бути не менше ніж " + length + " символів!" },
    required: "Поле обов'язкове до заповнення!"
  };

  constructor(
    private requestService: RequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.requestService.get<any>("api/user/tokencheck").subscribe(res => {
        this.router.navigate(['/' + this.env.language]);
    });
  }

  onSubmit(): void {
    this.errorsToDisplay.clear();

    if (!this.form.valid) {
      Object.keys(this.form.controls as any).forEach(control => {
        let errors = this.form.get(control)?.errors as any;
        let errorsMessages: any = [];
  
        if (errors != null && errors != undefined) {
          Object.keys(errors).forEach(error => {
            if (typeof(errors[error]) == 'object') {
              errorsMessages.push(this.errorMessages[error](Object.values(errors[error])[0]));
            } else {
              errorsMessages.push(this.errorMessages[error]);
            }
          });
        }
  
        this.errorsToDisplay.set(control, errorsMessages);
      });

      console.log(this.errorsToDisplay);

      return;
    }

    this.requestService.post<Array<AuthUser>>("api/user/login",
    {
      "Email": this.form.value.email,
      "Password": this.form.value.password
    }).subscribe(res => {
      localStorage.setItem("_auth", JSON.stringify(res));
      this.form.reset();
      this.router.navigate(['/' + this.env.language]);
    });
  }

}
