import {Component, OnInit} from '@angular/core';
import { Task } from 'src/app/model/Task';
import {TaskService} from "../../service/task.service";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-deadline-block',
  templateUrl: './deadline-block.component.html',
  styleUrls: ['./deadline-block.component.css']
})
export class DeadlineBlockComponent implements OnInit {
  currentTasks: Task[];
  overDueTasks: Task[];

  constructor(private taskService: TaskService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.updateLists();
  }

  updateLists() {
    this.taskService.getAllTasks()
      .subscribe(tasks => {
        this.currentTasks = tasks
          .filter(task => {
            return !task.done && new Date(task.deadlineDate) >= new Date();
          })
          .sort((task1, task2) => {
            if (new Date(task1.deadlineDate) < new Date(task2.deadlineDate)) return -1;
            return 1;
          });

        this.overDueTasks = tasks
          .filter(task => {
            return !task.done && new Date(task.deadlineDate) < new Date();
          })
          .sort((task1, task2) => {
            if (new Date(task1.deadlineDate) < new Date(task2.deadlineDate)) return -1;
            return 1;
          });
      });
  }

  logOut() {
    this.tokenStorageService.logOut();
  }
}
