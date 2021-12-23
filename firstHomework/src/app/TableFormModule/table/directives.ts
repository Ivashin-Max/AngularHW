import { Directive, ElementRef, Renderer2, HostListener  } from "@angular/core";


@Directive({
  selector: "[shine]",
})
export class ShineDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2){
}

@HostListener("mouseenter") onMouseEnter(): void {
  this.renderer.setStyle(this.elementRef.nativeElement, "transition", this.transition);
  this.renderer.setStyle(this.elementRef.nativeElement, "font-size", "18px");
  this.renderer.setStyle(this.elementRef.nativeElement, "background-color", this.bgcolor);
}

@HostListener("mouseleave") onMouseLeave(): void {
  this.renderer.setStyle(this.elementRef.nativeElement, "font-size", "");
  this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "");
}
transition = "0.9s ease";
bgcolor = "#39aea8";


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


