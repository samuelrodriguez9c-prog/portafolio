import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { Shot } from '../core/portfolio.data';

/**
 * Muestra una imagen o un video de proyecto.
 * Los videos se reproducen solos, sin sonido y en bucle, y se pausan cuando salen de pantalla.
 * Con "reducir movimiento" activado no se reproducen solos: quedan con controles.
 */
@Component({
  selector: 'app-media',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-video]': "shot().kind === 'video'" },
  template: `
    @if (shot().kind === 'video') {
      <video
        #video
        [poster]="shot().poster ?? ''"
        [attr.aria-label]="alt()"
        muted
        loop
        playsinline
        preload="metadata"
      >
        <source [src]="shot().src" type="video/mp4" />
        @if (shot().webm; as webm) {
          <source [src]="webm" type="video/webm" />
        }
      </video>
    } @else {
      <img [src]="shot().src" [alt]="alt()" loading="lazy" decoding="async" />
    }
  `,
  styles: `
    :host {
      display: block;
    }
    img,
    video {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top left;
      background: #1a1a18;
    }
  `,
})
export class Media {
  readonly shot = input.required<Shot>();
  readonly alt = input('');

  private video = viewChild<ElementRef<HTMLVideoElement>>('video');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const el = this.video()?.nativeElement;
      if (!el) return;

      el.muted = true; // necesario para que el navegador permita el autoplay
      el.load(); // vuelve a elegir fuente ahora que los <source> ya tienen su src

      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.controls = true;
        return;
      }

      const play = () => el.play().catch(() => (el.controls = true));

      if (typeof IntersectionObserver === 'undefined') {
        play();
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? play() : el.pause()),
        { threshold: 0.25 },
      );
      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
