import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8080/api/semester'

  constructor(private http: HttpClient) { }

  // getUserById(id: number): Observable<User> {
  //   return this.http.get()
  // }
}
