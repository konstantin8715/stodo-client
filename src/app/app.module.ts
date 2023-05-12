import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TodoCardComponent } from './component/todo-card/todo-card.component';
import { MainBlockComponent } from './component/main-block/main-block.component';
import { SemestersListComponent } from './component/semesters-list/semesters-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptorService} from "./service/auth-interceptor.service";
import {ErrorInterceptorService} from "./service/error-interceptor.service";
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import {MaterialModule} from "./material-module";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { DeadlineBlockComponent } from './component/deadline-block/deadline-block.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import { WelcomeComponent } from './component/welcome/welcome.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatBadgeModule} from "@angular/material/badge";

@NgModule({
  declarations: [
    AppComponent,
    TodoCardComponent,
    MainBlockComponent,
    SemestersListComponent,
    LoginComponent,
    RegistrationComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    DeadlineBlockComponent,
    MainPageComponent,
    WelcomeComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        MatChipsModule,
        MatToolbarModule,
        MatBadgeModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptorService,
    multi: true,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
