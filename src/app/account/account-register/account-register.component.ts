import { Component, OnInit } from '@angular/core';
import {AccountServiceProxy, RegisterInput} from "@shared/service-proxies/service-proxies";
import {MatSnackBar} from "@node_modules/@angular/material/snack-bar";
import {Router} from "@node_modules/@angular/router";

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.scss']
})
export class AccountRegisterComponent implements OnInit {
  pass: string;
  login: string;

  constructor(private acc: AccountServiceProxy,
              private snack: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    const input = new RegisterInput();
    input.name = this.login;
    input.surname = this.login;
    input.emailAddress = this.login + '@example.com';
    input.userName = this.login;
    input.password = this.pass;
    this.acc.register(input).toPromise().then(t => {
      this.snack.open('Регистрация успешна. Войдите', null, {duration: 3000});
      this.router.navigate(['/login']);
    });
  }
}
