import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "../../model/Subject";
import {TaskService} from "../../service/task.service";
import {Task} from "../../model/Task";
import {SubjectService} from "../../service/subject.service";
import {Semester} from "../../model/Semester";
import {NotificationService} from "../../service/notification.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css']
})
export class TodoCardComponent implements OnInit{
  @Input() subject: Subject;
  @Input() semester: Semester;
  @Input() index: number;
  addTaskTitle = new FormControl('', [Validators.required]);
  addTaskDeadline = new FormControl('', [Validators.required]);
  isTitleChange = false;

  log() {
    console.log(this.isTitleChange);
  }

  getTasksToSubject(semester: Semester, subject: Subject) {
    this.taskService.getTasksForSemesterAndSubject(semester.id, subject.id)
      .subscribe(data => subject.tasks = data);
  }

  ngOnInit(): void {
    this.taskService.getTasksForSemesterAndSubject(this.semester.id, this.subject.id)
      .subscribe(tasks => {
        this.subject.tasks = tasks;
      });
  }

  constructor(private taskService : TaskService,
              private subjectService: SubjectService,
              private notificationService: NotificationService) {
  }

  updateTask(semesterId: number, subjectId: number, task: Task) {
    if (task.deadlineDate != null) {
      this.taskService.updateTask(semesterId, subjectId, task.id,
          task.title, this.convertDeadlineDate(task.deadlineDate)).subscribe();
    }
    else {
      this.notificationService.showSnackBar("Date shouldn't be empty");
      task.deadlineDate = '1983-04-04';
    }
    this.isTitleChange = false;
  }

  updateSubject(semesterId: number, subjectId: number, title: string) {
    this.subjectService.updateSubject(semesterId, subjectId, title).subscribe();
    this.isTitleChange = false;
  }

  doTask(semesterId: number, subjectId: number, taskId: number, task: Task) {
    this.taskService.doTask(semesterId, subjectId, taskId)
      .subscribe(() => {
        task.done = !task.done;
      });
  }

  deleteTask(semesterId: number, subjectId: number, taskId: number, index: number) {
    this.taskService.deleteTask(semesterId, subjectId, taskId)
      .subscribe(() => {
        this.subject.tasks?.splice(index, 1);
      });
  }

  deleteSubject(semesterId: number, subjectId: number, index: number) {
    this.subjectService.deleteSubject(semesterId, subjectId)
      .subscribe(() => {
        this.semester.subjects?.splice(index, 1);
      });
  }

  createTask(semesterId: number, subjectId: number) {
    try {
      this.taskService.createTask(semesterId, subjectId, this.addTaskTitle.value, this.convertDeadlineDate(this.addTaskDeadline.value))
        .subscribe(task => {
          this.subject.tasks?.push(task);
          // this.addTaskTitle = task.title;
          // this.addTaskDeadline = task.deadlineDate;
        });
    }
    catch (e: any) {
      this.notificationService.showSnackBar("Date shouldn't be empty");
    }
  }

  convertDeadlineDate(deadlineDate: string | null) {
    let date = new Date();
    if (deadlineDate != null) {
      date = new Date(deadlineDate);
    }
    return date.toISOString().split('T')[0];
  }
}
