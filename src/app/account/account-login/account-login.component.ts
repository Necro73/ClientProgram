import {Component, Injector, OnInit} from '@angular/core';
import {MatSnackBar} from "@node_modules/@angular/material/snack-bar";
import {AppAuthService} from "@shared/auth/app-auth.service";

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.scss']
})
export class AccountLoginComponent implements OnInit {
  private submitting: boolean;


  login(): void {
    //if (this.form.valid) {
    // this.blockUiService.start('block-ui-main');
    // this.loginService.authenticateModel = new AuthenticateModel();
    // this.loginService.authenticateModel.userNameOrEmailAddress = this.formLogin.value;
    // this.loginService.authenticateModel.password = this.formPass.value;
    // this.loginService.authenticateModel.rememberClient = this.formRemember.value;
    this.submitting = true;
    this.loginService.rememberMe = this.loginService.authenticateModel.rememberClient;
    this.loginService.authenticate(() => this.submitting = false);
    // } else {
    //   // TODO Локализация сообщения ошибки
    //   this.toast.open('Ошибка! Проверьте правильность заполнения полей!');
    // }
  }

  constructor(private injector: Injector, public loginService: AppAuthService,
              private toast: MatSnackBar) {
  }

  ngOnInit(): void {
  }

}
