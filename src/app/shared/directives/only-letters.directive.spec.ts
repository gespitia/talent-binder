import { OnlyLettersDirective } from './only-letters.directive';
import { ElementRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<input type="text" appOnlyLetters>`
})
class TestComponent {}

describe('OnlyLettersDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlyLettersDirective, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.directive(OnlyLettersDirective));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new OnlyLettersDirective(inputEl);
    expect(directive).toBeTruthy();
  });

  it('should prevent non-letter key presses', () => {
    const event = new KeyboardEvent('keydown', { key: '1' });
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    inputEl.nativeElement.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });


  it('should allow allowed key presses', () => {
    const allowedKeys = [
      'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete', ' ', 'Shift'
    ];

    allowedKeys.forEach(key => {
      const event = new KeyboardEvent('keydown', { key: key });
      const preventDefaultSpy = spyOn(event, 'preventDefault');
      inputEl.nativeElement.dispatchEvent(event);
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    const letterEventA = new KeyboardEvent('keydown', { key: 'a' });
    const preventDefaultSpyA = spyOn(letterEventA, 'preventDefault');
    inputEl.nativeElement.dispatchEvent(letterEventA);
    expect(preventDefaultSpyA).not.toHaveBeenCalled();

    const letterEventZ = new KeyboardEvent('keydown', { key: 'Z' });
    const preventDefaultSpyZ = spyOn(letterEventZ, 'preventDefault');
    inputEl.nativeElement.dispatchEvent(letterEventZ);
    expect(preventDefaultSpyZ).not.toHaveBeenCalled();
  });

});
