import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "../../model/Subject";
import {TaskService} from "../../service/task.service";
import {Task} from "../../model/Task";
import {SubjectService} from "../../service/subject.service";
import {Semester} from "../../model/Semester";
import {NotificationService} from "../../service/notification.service";
import {FormControl, Validators} from "@angular/forms";
import {TimeService} from "../../service/time.service";

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css']
})
export class TodoCardComponent implements OnInit{
  @Input() subject: Subject;
  @Input() semester: Semester;
  @Input() index: number;
  tasks: Task[] = [];
  doneTasks: Task[] = [];
  addTaskTitle = new FormControl('', [Validators.required]);
  addTaskDeadline = new FormControl('', [Validators.required]);
  isTitleChange = false;


  log(s: string) {
    console.log(s);
  }

  // getTasksToSubject(semester: Semester, subject: Subject) {
  //   this.taskService.getTasksForSemesterAndSubject(semester.id, subject.id)
  //     .subscribe(data => subject.tasks = data);
  // }

  ngOnInit(): void {
    this.taskService.getTasksForSemesterAndSubject(this.semester.id, this.subject.id)
      .subscribe(tasks => {
        this.tasks = tasks
          .filter(task => {
            task.deadlineDate = this.timeService.convertDeadlineToLocal(task);
            return !task.done;
          })
          .sort((task1, task2) => {
            if (new Date(task1.deadlineDate) < new Date(task2.deadlineDate)) return -1;
            return 1;
          });
      });

    this.taskService.getTasksForSemesterAndSubject(this.semester.id, this.subject.id)
      .subscribe(tasks => {
        this.doneTasks = tasks
          .filter(task => {
            task.deadlineDate = this.timeService.convertDeadlineToLocal(task);
            return task.done;
          })
          .sort((task1, task2) => {
            if (new Date(task1.deadlineDate) < new Date(task2.deadlineDate)) return -1;
            return 1;
          });
      });
  }

  constructor(private taskService : TaskService,
              private subjectService: SubjectService,
              private notificationService: NotificationService,
              private timeService: TimeService) {
  }

  updateTask(semesterId: number, subjectId: number, task: Task) {
    this.taskService.updateTask(semesterId, subjectId, task.id,
          task.title, this.timeService.convertDeadlineDateToISO(task.deadlineDate)).subscribe();
    task.isChange = false;
  }

  updateSubject(semesterId: number, subjectId: number, title: string) {
    this.subjectService.updateSubject(semesterId, subjectId, title).subscribe();
    this.isTitleChange = false;
  }

  doTask(semesterId: number, subjectId: number, taskId: number, index: number, task: Task) {
    this.taskService.doTask(semesterId, subjectId, taskId)
      .subscribe(task => {
        task.deadlineDate = this.timeService.convertDeadlineToLocal(task);
        if (task.done) {
          this.tasks?.splice(index, 1);
          this.doneTasks.push(task);
        }
        else {
          this.doneTasks?.splice(index, 1);
          this.tasks.push(task);
        }
        this.tasks.sort((task1, task2) => {
          if (new Date(task1.deadlineDate) < new Date(task2.deadlineDate)) return -1;
          return 1;
        });
      });
  }

  deleteTask(semesterId: number, subjectId: number, taskId: number, index: number, tasks: Task[]) {
    this.taskService.deleteTask(semesterId, subjectId, taskId)
      .subscribe(() => {
        tasks?.splice(index, 1);
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
      this.taskService.createTask(semesterId, subjectId, this.addTaskTitle.value,
        this.timeService.convertDeadlineDateToISO(this.addTaskDeadline.value))
        .subscribe(task => {
          task.deadlineDate = this.timeService.convertDeadlineToLocal(task);
          this.tasks?.push(task);
          this.tasks.sort((task1, task2) => {
            if (new Date(task1.deadlineDate) < new Date(task2.deadlineDate)) return -1;
            return 1;
          });
          // this.addTaskTitle.setValue('');
          // this.addTaskDeadline.setValue('');
        });
    }
    catch (e: any) {
      this.notificationService.showSnackBar("Date shouldn't be empty");
    }
  }

  // protected readonly focus = focus;
  panelOpenState = false;
}
