import { Injectable } from '@angular/core';
import {Semester} from "../model/Semester";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  url = 'http://localhost:8080/api/semester';

  constructor(private http: HttpClient) { }

  getAllSemesters(): Observable<Semester[]> {
    return this.http.get<Semester[]>(this.url, /*{headers: headers}*/);
  }

  updateSemester(id: number, title: string): Observable<Object> {
    const body = {title: title};
    return this.http.patch(this.url + '/' + id, body, /*{headers: headers}*/);
  }

  deleteSemester(semesterId: any) {
    return this.http.delete(this.url + '/' + semesterId, /*{headers: headers}*/);
  }

  createSemester(title: string): Observable<Semester> {
    const body = {title: title};
    return this.http.post<Semester>(this.url, body, /*{headers: headers}*/);
  }
}
