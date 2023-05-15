import { Component } from '@angular/core';
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private tokenStorageService: TokenStorageService) {
  }

  logOut() {
    this.tokenStorageService.logOut();
  }

  changeBlock = true;
}
