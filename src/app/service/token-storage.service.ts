import { Injectable } from '@angular/core';
import {User} from "../model/User";
import {Router} from "@angular/router";
import {Semester} from "../model/Semester";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const CURRENT_SEMESTER_KEY = 'current-semester';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private router: Router) { }

  public saveCurrentSemester(semesterId: number) {
    window.sessionStorage.removeItem(CURRENT_SEMESTER_KEY);
    window.sessionStorage.setItem(CURRENT_SEMESTER_KEY, semesterId.toString());
  }

  public getCurrentSemester() {
    if (sessionStorage.getItem(CURRENT_SEMESTER_KEY) == null) return -1;
    return sessionStorage.getItem(CURRENT_SEMESTER_KEY);
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: User) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User {
    return JSON.parse(sessionStorage.getItem(USER_KEY) as string);
  }

  logOut() {
    window.sessionStorage.clear();
    // window.location.reload();
    this.router.navigate(['login']);
   }
}
