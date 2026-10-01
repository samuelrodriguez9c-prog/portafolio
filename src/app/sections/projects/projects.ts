import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { PortfolioStore } from '../../core/portfolio.store';
import { InspectTag } from '../../shared/inspect-tag';
import { Media } from '../../shared/media';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-projects',
  imports: [TranslocoPipe, Media, InspectTag, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected store = inject(PortfolioStore);

  protected readonly inspectLabel = computed(
    () => `<app-explorador [proyecto]="${this.store.projectId()}" [filtro]="${this.store.skill()?.label ?? '—'}">`,
  );

  protected range(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
}
