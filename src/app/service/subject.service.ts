import { Injectable } from '@angular/core';
import {Subject} from "../model/Subject";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
// import {headers} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  url = 'http://localhost:8080/api/subject/';

  constructor(private http: HttpClient) { }

  getSubjectsForSemester(id: number) {
    return this.http.get<Subject[]>(this.url + id, /*{headers: headers}*/);
  }

  updateSubject(semesterId: number, subjectId: number, title: string) {
    const body = {title: title};
    return this.http.patch(this.url + semesterId + '/' + subjectId, body, /*{headers: headers}*/);
  }

  deleteSubject(semesterId: number, subjectId: number) {
    return this.http.delete(this.url + semesterId + '/' + subjectId, /*{headers: headers}*/);
  }

  createSubject(semesterId: number, title: string): Observable<Subject> {
    const body = {title: title};
    return this.http.post<Subject>(this.url + semesterId, body, /*{headers: headers}*/);
  }
}
