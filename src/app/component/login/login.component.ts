import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hide = true;

  constructor(private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private notificationService: NotificationService,
              private router: Router,
              private fb: FormBuilder) {
    if (tokenStorageService.getUser()) {
      this.router.navigate(['main']);
    }
  }

  ngOnInit(): void {
  }

  submit() {
    this.authService.login({
      email: this.email.value,
      password: this.password.value
    }).subscribe(data => {
      console.log(data);

      this.tokenStorageService.saveToken(data.token);
      this.tokenStorageService.saveUser(data);

      this.notificationService.showSnackBar("Successfully logged in");
      this.router.navigate(['/']);
      window.location.reload();

    }, error => {
      console.log(error);
      this.notificationService.showSnackBar(error);
    })
  }
}
