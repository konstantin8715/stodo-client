import { Injectable } from '@angular/core';
import {Task} from "../model/Task";

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  convertDeadlineDateToISO(deadlineDate: string | null) {
    // console.log(deadlineDate)
    let date = new Date();
    if (deadlineDate != null) {
      date = new Date(deadlineDate);
    }
    // console.log(date)
    // console.log(new Date(date.toISOString()))
    return date.toISOString();
  }

  convertDeadlineToLocal(task: Task) {
    return task.deadlineDate = new Date(task.deadlineDate + 'Z').toString();
  }
}
