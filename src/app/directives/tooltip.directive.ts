import { Directive, effect, ElementRef, inject, input, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  host: {
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
  },
})
export class TooltipDirective implements OnDestroy {
  readonly appTooltip = input.required<string>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private tooltip: HTMLElement | null = null;

  constructor() {
    effect(() => {
      const text = this.appTooltip();
      if (this.tooltip) {
        this.renderer.setProperty(this.tooltip, 'textContent', text);
      }
    });
  }

  protected show(): void {
    const tooltip: HTMLElement = this.renderer.createElement('div');
    this.renderer.addClass(tooltip, 'tooltip');
    this.renderer.setProperty(tooltip, 'textContent', this.appTooltip());
    this.renderer.appendChild(document.body, tooltip);

    const hostRect = this.host.nativeElement.getBoundingClientRect();
    this.renderer.setStyle(tooltip, 'top', `${hostRect.bottom + window.scrollY + 16}px`);
    this.renderer.setStyle(tooltip, 'left', `${hostRect.right + window.scrollX + 3 - tooltip.offsetWidth}px`);

    this.tooltip = tooltip;
  }

  protected hide(): void {
    if (this.tooltip) {
      this.renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }
  }

  ngOnDestroy(): void {
    this.hide();
  }
}
