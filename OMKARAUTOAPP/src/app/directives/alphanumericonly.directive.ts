import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[alphanumericonly]'
})
export class AlphanumericonlyDirective {
  regexStr = '^[a-zA-Z0-9_]*$';

  constructor(private el: ElementRef) { }

  @HostListener('keypress', ['$event']) onKeyPress(event: any) {
    return new RegExp(this.regexStr).test(event.key);
  }

  // @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
  //   this.validateFields(event);
  // }

  // validateFields(event: any) {
  //   console.log(event.target.value);
  //   setTimeout(() => {
  //     this.el.nativeElement.value = this.el.nativeElement.value
  //       .replace(/[^A-Za-z ]/g, '')
  //       .replace(/\s/g, '');
  //     event.preventDefault();
  //   }, 100);
  // }
}
