import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  public resetForm: FormGroup;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.resetForm = this.createResetForm();
  }

  createResetForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.compose([Validators.required])]
    });
  }

  submit(): void {
    console.log(this.resetForm.value);

    this.authService.resetPassword({
      email: this.resetForm.value.email
    }).subscribe(data => {
      console.log(data);
      this.notificationService.showSnackBar('Password send to your email!');
      this.router.navigate(['login']);
    }, error => {
      console.log(error);
      this.notificationService.showSnackBar(error.message);
    });
  }
}
