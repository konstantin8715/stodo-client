import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./component/login/login.component";
import {RegistrationComponent} from "./component/registration/registration.component";
import {MainBlockComponent} from "./component/main-block/main-block.component";
import {ResetPasswordComponent} from "./component/reset-password/reset-password.component";
import {ForgotPasswordComponent} from "./component/forgot-password/forgot-password.component";
import {MainPageComponent} from "./component/main-page/main-page.component";
import {WelcomeComponent} from "./component/welcome/welcome.component";
import {DeadlineBlockComponent} from "./component/deadline-block/deadline-block.component";

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'main', component: MainPageComponent},
  {path: 'forgot', component: ForgotPasswordComponent},
  {path: 'reset', component: ResetPasswordComponent},
  {path: 'deadline', component: DeadlineBlockComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
