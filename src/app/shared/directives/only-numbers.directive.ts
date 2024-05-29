import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'
    ];
    if (allowedKeys.includes(event.key) ||
        (event.key >= '0' && event.key <= '9') ||
        (event.code >= 'Numpad0' && event.code <= 'Numpad9')) {
      return;
    } else {
      event.preventDefault();
    }
  }
}
