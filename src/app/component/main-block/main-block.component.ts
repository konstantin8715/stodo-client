import {Component, OnInit} from '@angular/core';
import {SubjectService} from "../../service/subject.service";
import {Semester} from "../../model/Semester";
import {SemesterService} from "../../service/semester.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {Router} from "@angular/router";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {FormControl, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {ShareService} from "../../service/share.service";

@Component({
  selector: 'app-main-block',
  templateUrl: './main-block.component.html',
  styleUrls: ['./main-block.component.css']
})
export class MainBlockComponent implements OnInit {
  semesterTitle = new FormControl('', [Validators.required]);
  semesters: Semester[] = [];
  currentSemester: Semester;

  constructor(public subjectService: SubjectService,
              public semesterService: SemesterService,
              public tokenStorageService: TokenStorageService,
              public shareService: ShareService,
              public router: Router) {
  }

  uploadSemester() {
    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.addEventListener('change', event => {
      const target = event.target as HTMLInputElement;
      // @ts-ignore
      const selectedFile = target.files[0];
      const uploadData = new FormData();
      uploadData.append('file', selectedFile, selectedFile.name);
      this.shareService.upload(uploadData).subscribe(() => {
        this.semesterService.getAllSemesters()
          .subscribe(semesters => {
            this.semesters = semesters;
            // @ts-ignore
            this.currentSemester = this.getCurrentSemester();
            this.getSubjectsToSemester(this.semesters);
          });
      });
      // @ts-ignore
      fileInput = null;
    });
    fileInput.click();
  }

  dumpSemester(semesterId: number) {
    this.shareService.dump(semesterId).subscribe(response => {
      let fileName = this.currentSemester.title + ' ' +
        new Date(this.currentSemester.createdAt).toDateString();
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      // @ts-ignore
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
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
        // @ts-ignore
        this.currentSemester = this.getCurrentSemester();
        this.getSubjectsToSemester(this.semesters);
      });
  }

  updateSemester(title: string | null) {
    // const value = event.value.trim();
    this.semesterService.updateSemester(this.currentSemester.id, title).subscribe(() =>{
      if (title != null) {
        this.currentSemester.title = title;
      }
    });
  }

  deleteSemester() {
    this.semesterService.deleteSemester(this.currentSemester.id)
      .subscribe(s => {
        // console.log('current semester id = ' + this.currentSemester.id);
        // console.log(this.getCurrentSemesterIndex())
        // console.log(this.semesters);
        this.semesters.splice(this.getCurrentSemesterIndex  (), 1);
        this.currentSemester = this.semesters[0];
        this.saveCurrentSemester(this.semesters[0]);
      });
  }

  getCurrentSemesterIndex() {
    for (let i = 0; i < this.semesters.length; i++) {
      console.log(this.semesters[i].id);
      if (this.semesters[i].id === this.currentSemester.id) return i;
    }
    return 0;
  }

  createSemester() {
    let semester;
    this.semesterService.createSemester('Новый семестр')
      .subscribe(s => {
        this.semesters.push(s);
        // this.currentSemester = this.semesters[this.semesters.length - 1];
        // this.semesterTitle.setValue('');
        this.saveCurrentSemester(s);
        this.currentSemester = s;
        semester = s;
      });
    return semester;
    // const value = event.value.trim();
    //
    // if (value) {
    //   this.semesterService.createSemester(value)
    //     .subscribe(s => {
    //       this.semesters.push(s);
    //       this.currentSemester = this.semesters[this.semesters.length - 1];
    //     });
    // }
  }

  createSubject(semesterId: number) {
    this.subjectService.createSubject(semesterId, "Новый предмет")
      .subscribe(s => {
        // @ts-ignore
        this.getCurrentSemester().subjects?.push(s);
        this.getSubjectsToSemester(this.semesters);
      });
  }

  saveCurrentSemester(semester: Semester) {
    this.tokenStorageService.saveCurrentSemester(semester.id);
  }

  getCurrentSemester() {
    let id: number;
    let semester;
    if (this.tokenStorageService.getCurrentSemester() != null) {
      id = Number(this.tokenStorageService.getCurrentSemester());
      this.semesters.forEach(s => {
        if (s.id == id)
          semester = s;
      })
    }
    else {
      semester = this.createSemester();
      // @ts-ignore
      this.saveCurrentSemester(semester);
    }
    return semester;
  }

  protected readonly window = window;
}
