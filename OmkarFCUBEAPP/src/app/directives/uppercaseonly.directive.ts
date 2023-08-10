import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[uppercaseonly]'
})
export class UppercaseonlyDirective {

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }

}
