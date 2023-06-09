import {LOCALE_ID, NgModule} from '@angular/core';
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
import { DeadlinePageComponent } from './component/deadline-block/deadline-page.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import { WelcomeComponent } from './component/welcome/welcome.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatBadgeModule} from "@angular/material/badge";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSidenavModule} from "@angular/material/sidenav";
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');

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
    DeadlinePageComponent,
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
    MatBadgeModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSidenavModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptorService,
    multi: true,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  }, { provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
