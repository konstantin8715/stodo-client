import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/User";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8080/api/auth/'

  constructor(private http: HttpClient) { }

  public login(user: { password: string | null; email: string | null }): Observable<any> {
    return this.http.post(this.url + 'signin', {
      email: user.email,
      password: user.password
    })
  }

  public register(user: { password: string | null; confirmPassword: string | null; email: string | null }) {
    return this.http.post(this.url + 'signup', {
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword
    })
  }

  public forgotPassword(body: any) {
    return this.http.post(this.url + 'forgotPassword', body);
  }

  public resetPassword(body: any) {
    return this.http.post(this.url + 'resetPassword', body);
  }
}
