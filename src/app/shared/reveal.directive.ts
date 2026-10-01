import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/** Agrega la clase `is-visible` cuando el elemento entra en pantalla (una sola vez). */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal', '[style.transition-delay.ms]': 'revealDelay()' },
})
export class RevealDirective {
  readonly revealDelay = input(0);

  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement;
      if (typeof IntersectionObserver === 'undefined') {
        node.classList.add('is-visible');
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              node.classList.add('is-visible');
              observer.disconnect();
            }
          }
        },
        { threshold: 0.15 },
      );
      observer.observe(node);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
