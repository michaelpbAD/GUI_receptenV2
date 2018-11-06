import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input('color') color = '#ffcc66';
  hl = false;

  constructor(private el: ElementRef) { }

  @HostListener('click') myClick() {
    if (!this.hl) {
      this.highlight(this.color );
      this.hl = !this.hl;
    } else {
      this.highlight(null);
      this.hl = !this.hl;
    }
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
