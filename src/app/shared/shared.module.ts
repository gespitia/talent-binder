import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MaterialModule } from './modules/material.module';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { OnlyLettersDirective } from './directives/only-letters.directive';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    OnlyNumbersDirective,
    OnlyLettersDirective
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
    MaterialModule
  ]
})
export class SharedModule { }
