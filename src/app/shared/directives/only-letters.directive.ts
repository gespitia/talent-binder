import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyLetters]'
})
export class OnlyLettersDirective {

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete', ' ', 'Shift'
    ];

    if (allowedKeys.includes(event.key) || (event.key >= 'a' && event.key <= 'z') || (event.key >= 'A' && event.key <= 'Z')) {
      return;
    } else {
      event.preventDefault();
    }
  }

}
