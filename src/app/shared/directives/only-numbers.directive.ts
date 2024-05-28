import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // Lista de teclas que permitimos además de los números
    const allowedKeys = [
      'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'
    ];
    // Permitir teclas de control y números del teclado numérico
    if (allowedKeys.includes(event.key) ||
        (event.key >= '0' && event.key <= '9') ||
        (event.code >= 'Numpad0' && event.code <= 'Numpad9')) {
      // Dejar que suceda el evento
      return;
    } else {
      // Prevenir el comportamiento por defecto
      event.preventDefault();
    }
  }
}
