import { Directive, ElementRef, Renderer2, HostListener, OnChanges,  Input } from "@angular/core";



@Directive({
  selector: "[shine]",
})
export class ShineDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2){
}

@HostListener("mouseenter") onMouseEnter(): void {
  this.renderer.addClass(this.elementRef.nativeElement, "shine");
}

@HostListener("mouseleave") onMouseLeave(): void {
  this.renderer.removeClass(this.elementRef.nativeElement, "shine");
}
}

@Directive({
  selector: "[tooltip]",
})
export class TooltipDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2){
}

@HostListener("mouseenter") onMouseEnter(): void {
  this.renderer.addClass(this.elementRef.nativeElement, "tooltip");
  this.renderer.setAttribute(this.elementRef.nativeElement, "data-tooltip", this.elementRef.nativeElement.innerText);
}
}

@Directive({
  selector: "[birthdayCake]",
})
export class BirthdayCakeDirective implements  OnChanges{
  @Input() value: string = "" ;
  constructor(private el: ElementRef,  private renderer: Renderer2) {
  }

  ngOnChanges(): void {
    const img = this.renderer.createElement("img");
    this.renderer.setAttribute(img, "src", "../../../assets/img/cake.svg");

    if (this.checkBirthday()  && this.el.nativeElement.children.length === 0){
        this.renderer.appendChild(this.el.nativeElement, img);
    }
    if (!this.checkBirthday() && this.el.nativeElement.children.length > 0){
        this.renderer.removeChild(this.el.nativeElement, this.el.nativeElement.childNodes[1]);
    }
  }



  checkBirthday (): unknown{
      const correctDate = new Date(this.value.split(".").reverse().join("-"));
      const currentDate = new Date();

      if (correctDate.getMonth() === currentDate.getMonth() && correctDate.getUTCDate() === currentDate.getUTCDate()){
        return true;
      }
    return false;
  }
 }


