import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[numbersonly]'
})
export class NumbersonlyDirective {

  constructor(private el: ElementRef) { }
	@HostListener('keypress', ['$event'])
	onKeyPress(event: KeyboardEvent) {
		if (!/[0-9]/.test(event.key)) {
			event.preventDefault();
		}
	}
	@HostListener('paste', ['$event'])
	onPaste(event: ClipboardEvent) {
		const pastedInput = event.clipboardData?.getData('text');

		if (!/^[0-9]*$/.test(pastedInput || '')) {
			event.preventDefault();
		}
	}
}
