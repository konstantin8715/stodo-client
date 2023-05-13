import { Injectable } from '@angular/core';
import { Task } from '../model/Task';
import {HttpClient} from "@angular/common/http";
// import {headers, token} from "../constants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url = 'http://localhost:8080/api/task/';

  constructor(private http: HttpClient) { }

  getTasksForSemesterAndSubject(semesterId: number, subjectId: number) {
    return this.http.get<Task[]>(this.url + semesterId + '/' + subjectId, /*{headers: headers}*/);
  }

  getAllTasks() {
    return this.http.get<Task[]>(this.url);
  }

  updateTask(semesterId: number, subjectId: number, taskId: number, title: string, deadlineDate: string) {
    const body = {title: title, deadlineDate: deadlineDate};
    return this.http
      .patch(this.url + semesterId + '/' + subjectId + '/' + taskId + '/u', body, /*{headers: headers}*/);
  }

  doTask(semesterId: number, subjectId: number, taskId: number) {
    return this.http.patch(this.url + semesterId + '/' + subjectId + '/' + taskId, {}, /*{headers: headers}*/);
  }

  deleteTask(semesterId: number, subjectId: number, taskId: number) {
    return this.http.delete(this.url + semesterId + '/' + subjectId + '/' + taskId, /*{headers: headers}*/);
  }

  createTask(semesterId: number, subjectId: number, title: string | null, deadlineDate: string): Observable<Task> {
    const body = {title: title, deadlineDate: deadlineDate};
    return this.http.post<Task>(this.url + semesterId + '/' + subjectId, body, /*{headers: headers}*/);
  }
}
