import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { CONTACT } from '../../core/portfolio.data';
import { PortfolioStore } from '../../core/portfolio.store';
import { InspectTag } from '../../shared/inspect-tag';
import { Media } from '../../shared/media';

const ROTATE_MS = 6000;

@Component({
  selector: 'app-hero',
  imports: [TranslocoPipe, Media, InspectTag],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected store = inject(PortfolioStore);
  protected readonly cv = CONTACT.cv;
  protected readonly rotateMs = ROTATE_MS;
  /** se pausa mientras el mouse está sobre la vista previa */
  protected readonly paused = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;
      const id = setInterval(() => {
        if (!this.store.heroTouched() && !this.paused()) this.store.nextHero();
      }, ROTATE_MS);
      destroyRef.onDestroy(() => clearInterval(id));
    });
  }

  protected projectName(id: string): string {
    return this.store.projects.find((p) => p.id === id)!.name;
  }
}
