import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appActionComment]'
})
export class ActionCommentDirective {
  @Input('name') name = 'action';
  @Input('comment') comment = 'comment';
  show = false;

  constructor(private ref: ElementRef) { }

  @HostListener('click') myClick() {
    this.ref.nativeElement.style.borderRadius = '5px';
    this.ref.nativeElement.style.padding = '0px 5px 1px 5px';
    if (!this.show) {
      this.show = !this.show;
      this.ref.nativeElement.innerHTML = '<h5>' + this.name + '</h5>' + '<p>' + this.comment + '</p>';
      this.ref.nativeElement.style.backgroundColor = 'whitesmoke';
      this.ref.nativeElement.style.color = 'black';
      this.ref.nativeElement.style.textDecoration = 'none';
      // const h = this.ref.nativeElement.getElementsByTagName('h5');
      // h.setAttribute('style', 'text-decoration: underline;' +
      //   '   padding-left: 5px;' +
      //   '   margin: 0px 0px 3px 0px;' +
      //   '   color: whitesmoke;');
      //
      // const p = this.ref.nativeElement.getElementsByTagName('p');
      // p.setAttribute('style', 'background-color: whitesmoke;' +
      //   '  border-radius: 5px;' +
      //   '  padding: 5px;' +
      //   '  margin: 0px 0px 1px 0px;');
    } else {
      this.show = !this.show;
      this.ref.nativeElement.innerHTML = '<h5>' + this.name + '</h5>';
      this.ref.nativeElement.style.backgroundColor = 'gray';
      this.ref.nativeElement.style.color = 'whitesmoke';
      this.ref.nativeElement.style.textDecoration = 'underline';
      // const h = this.ref.nativeElement.getElementsByTagName('h5');
      // h.setAttribute('style', 'text-decoration: underline;' +
      //   '   padding-left: 5px;' +
      //   '   margin: 0px 0px 3px 0px;' +
      //   '   color: whitesmoke;');
    }

  }

}
