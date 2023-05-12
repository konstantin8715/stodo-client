import { Component } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {NotificationService} from "../../service/notification.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  email =
    new FormControl('', [Validators.required, Validators.email]);
  password =
    new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassword =
    new FormControl('', [Validators.required, Validators.minLength(6)]);
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.authService.register({
      email: this.email.value,
      password: this.password.value,
      confirmPassword: this.confirmPassword.value
    }).subscribe(data => {
      console.log(data);
      this.notificationService.showSnackBar('Вы зарегистрированы! ' +
        'Пожалуйста, проверьте почту для подтверждения аккаунта!');
      this.router.navigate(['login']);
    }, error => {
      console.log(error);
      this.notificationService.showSnackBar(error);
    });
  }
}
