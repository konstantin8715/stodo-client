import { Injectable } from '@angular/core';
import {Semester} from "../model/Semester";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  url = 'http://localhost:8080/api/share/';

  constructor(private http: HttpClient) { }

  upload(data: FormData) {
    return this.http.post(this.url + 'upload', data);
  }

  // upload()

  dump(semesterId: number) {
    return this.http.get(this.url + 'dump/' + semesterId,
      {observe:'response', responseType: 'blob'});
  }
}
