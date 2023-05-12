import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  // TODO Сделать валидаторы для полей формы
  email =
    new FormControl('', [Validators.required, Validators.email]);
  code =
    new FormControl('', [Validators.required]);
  password =
    new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassword =
    new FormControl('', [Validators.required, Validators.minLength(6)]);

  isCodeSend = false;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private notificationService: NotificationService,
              private router: Router,
              private fb1: FormBuilder,
              private fb2: FormBuilder) {
  }

  ngOnInit(): void {
  }

  sendCode(){
    this.authService.forgotPassword({
      email: this.email.value
    }).subscribe(data => {
      console.log(data);

      this.notificationService.showSnackBar("Код для изменения пароля отправлен на ваш email");
      this.isCodeSend = true;

    }, error => {
      console.log(error);
      this.notificationService.showSnackBar(error);
    })
  }

  resetPassword() {
    console.log(this.password.value);
    this.authService.resetPassword({
      email: this.email.value,
      code: this.code.value,
      password: this.password.value,
      confirmPassword: this.confirmPassword.value
    }).subscribe(data => {
      console.log(data);

      this.notificationService.showSnackBar("Пароль успешно изменен");
      this.router.navigate(['login']);

    }, error => {
      console.log(error);
      this.notificationService.showSnackBar(error);
    })
  }
}
