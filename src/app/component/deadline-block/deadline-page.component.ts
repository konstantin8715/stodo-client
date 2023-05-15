import {Component, Input, OnInit} from '@angular/core';
import { Task } from 'src/app/model/Task';
import {TaskService} from "../../service/task.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {TimeService} from "../../service/time.service";
import {Semester} from "../../model/Semester";
import {SemesterService} from "../../service/semester.service";
import {SubjectService} from "../../service/subject.service";
import {Subject} from "../../model/Subject";
import {take} from "rxjs";

@Component({
  selector: 'app-deadline-block',
  templateUrl: './deadline-page.component.html',
  styleUrls: ['./deadline-page.component.css']
})
export class DeadlinePageComponent implements OnInit {
  currentTasks: Task[] = [];
  overDueTasks: Task[] = [];
  tasks: Task[] = [];

  constructor(private taskService: TaskService,
              private semesterService: SemesterService,
              private subjectService: SubjectService,
              private tokenStorageService: TokenStorageService,
              private timeService: TimeService) {
  }

  ngOnInit(): void {
    this.updateLists();
  }

  updateLists() {
    this.semesterService.getAllSemesters()
      .subscribe(semesters => {
        semesters.forEach(semester => {
          this.subjectService.getSubjectsForSemester(semester.id)
            .subscribe(subjects => {
              subjects.forEach(subject => {
                this.taskService.getTasksForSemesterAndSubject(semester.id, subject.id)
                  .subscribe(tasks => {
                    tasks.forEach(task => {
                      if (!task.done) {
                        task.deadlineDate = this.timeService.convertDeadlineToLocal(task);
                        const prefix = semester.title + '/' + subject.title + '/';
                        task.title = prefix + task.title;

                        if (new Date(task.deadlineDate) >= new Date()) {
                          this.currentTasks.push(task);
                          this.currentTasks.sort((task1, task2) => {
                            if (new Date(task1.deadlineDate) < new Date(task2.deadlineDate)) return -1;
                            return 1;
                          })
                        }
                        else {
                          this.overDueTasks.push(task);
                          this.overDueTasks.sort((task1, task2) => {
                            if (new Date(task1.deadlineDate) < new Date(task2.deadlineDate)) return -1;
                            return 1;
                          })
                        }
                      }
                    })
                  })
              })
            })
        })
      });
  }

  logOut() {
    this.tokenStorageService.logOut();
  }

  // sortLists() {
  //   console.log("fojsdl")
  //
  //   console.log(this.currentTasks);
  //
  //   this.currentTasks.sort((task1, task2) => {
  //     if (new Date(task1.deadlineDate) < new Date(task2.deadlineDate)) return -1;
  //     return 1;
  //   });
  //
  //   this.overDueTasks.sort((task1, task2) => {
  //     if (new Date(task1.deadlineDate) < new Date(task2.deadlineDate)) return -1;
  //     return 1;
  //   });
  // }
}
