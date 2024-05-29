import { OnlyNumbersDirective } from './only-numbers.directive';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

@Component({
  template: `<input appOnlyNumbers>`
})
class TestComponent {}

describe('OnlyNumbersDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlyNumbersDirective, TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    inputEl = fixture.nativeElement.querySelector('input');
  });

  function createKeyboardEvent(key: string, code: string): KeyboardEvent {
    const event = new KeyboardEvent('keydown', {
      key: key,
      code: code
    });
    spyOn(event, 'preventDefault');
    return event;
  }

  it('should allow allowed keys', () => {
    const allowedKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'];
    allowedKeys.forEach(key => {
      const event = createKeyboardEvent(key, key);
      inputEl.dispatchEvent(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  it('should allow number keys (0-9)', () => {
    for (let i = 0; i <= 9; i++) {
      const event = createKeyboardEvent(i.toString(), `Digit${i}`);
      inputEl.dispatchEvent(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    }
  });

  it('should allow numpad number keys (Numpad0-Numpad9)', () => {
    for (let i = 0; i <= 9; i++) {
      const event = createKeyboardEvent(i.toString(), `Numpad${i}`);
      inputEl.dispatchEvent(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    }
  });

  it('should prevent non-allowed keys', () => {
    const nonAllowedKeys = ['a', 'A', '!', '@', 'ArrowUp', 'ArrowDown'];
    nonAllowedKeys.forEach(key => {
      const event = createKeyboardEvent(key, key);
      inputEl.dispatchEvent(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
});
