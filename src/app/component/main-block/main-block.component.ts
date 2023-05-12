import {Component, OnInit} from '@angular/core';
import {SubjectService} from "../../service/subject.service";
import {Semester} from "../../model/Semester";
import {SemesterService} from "../../service/semester.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {Router} from "@angular/router";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";

@Component({
  selector: 'app-main-block',
  templateUrl: './main-block.component.html',
  styleUrls: ['./main-block.component.css']
})
export class MainBlockComponent implements OnInit {
  semesters: Semester[] = [];
  currentSemester: Semester;

  constructor(public subjectService: SubjectService,
              public semesterService: SemesterService,
              public tokenStorageService: TokenStorageService,
              public router: Router) {
  }

  getSubjectsToSemester(semesters: Semester[]) {
    semesters.forEach(s => {
      this.subjectService.getSubjectsForSemester(s.id)
        .subscribe(data => s.subjects = data);
    })
  }

  ngOnInit(): void {
    this.semesterService.getAllSemesters()
      .subscribe(semesters => {
        this.semesters = semesters;
        this.currentSemester = semesters[0];
        this.getSubjectsToSemester(this.semesters);
      });
  }

  updateSemester(semester: Semester, event: MatChipEditedEvent) {
    const value = event.value.trim();
    // console.log('update semester');
    console.log(value);
    this.semesterService.updateSemester(semester.id, value).subscribe(() =>{
      semester.title = value;
    });
  }

  deleteSemester(id: number, index: number) {
    this.semesterService.deleteSemester(id)
      .subscribe(() => {
        this.semesters.splice(index, 1);
        this.currentSemester = this.semesters[0];
      });
  }

  createSemester(event: MatChipInputEvent) {
    const value = event.value.trim();

    this.semesterService.createSemester(value)
      .subscribe(s => {
        this.semesters.push(s);
        this.currentSemester = this.semesters[this.semesters.length - 1];
      });
  }

  createSubject(semesterId: number) {
    this.subjectService.createSubject(semesterId, "subject")
      .subscribe(s => {
        this.currentSemester.subjects?.push(s);
        this.getSubjectsToSemester(this.semesters);
      });
  }

  protected readonly console = console;
}
