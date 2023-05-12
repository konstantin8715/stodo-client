import {NgModule} from "@angular/core";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCard} from "@angular/material/card";

@NgModule({
  exports: [
    MatSnackBarModule,
    MatFormFieldModule,
    MatNativeDateModule
  ]
})

export class MaterialModule {

}
