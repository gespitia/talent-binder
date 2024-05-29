import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MaterialModule } from './modules/material.module';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { OnlyLettersDirective } from './directives/only-letters.directive';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    OnlyNumbersDirective,
    OnlyLettersDirective,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterLink,
    RouterLinkActive
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    OnlyNumbersDirective,
    OnlyLettersDirective,
    MaterialModule,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
