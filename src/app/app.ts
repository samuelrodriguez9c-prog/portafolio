import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageService } from './core/language.service';
import { PortfolioStore } from './core/portfolio.store';
import { Nav } from './layout/nav';
import { Contact } from './sections/contact/contact';
import { Hero } from './sections/hero/hero';
import { Projects } from './sections/projects/projects';
import { Stack } from './sections/stack/stack';
import { Timeline } from './sections/timeline/timeline';

@Component({
  selector: 'app-root',
  imports: [Nav, Hero, Projects, Timeline, Stack, Contact, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.inspecting]': 'store.inspect()' },
  template: `
    <app-nav />
    <main>
      <app-hero />
      <app-projects />
      <app-timeline />
      <app-stack />
      <app-contact />
    </main>

    @if (store.inspect()) {
      <aside class="panel mono" role="status" animate.enter="anim-pop" animate.leave="anim-leave">
        <strong>{{ 'inspector.title' | transloco }}</strong>
        <span>{{ 'inspector.built' | transloco }}</span>
        <span>· {{ 'inspector.standalone' | transloco }}</span>
        <span>· {{ 'inspector.signals' | transloco }}</span>
        <span>· {{ 'inspector.i18n' | transloco }}</span>
        <span>· {{ 'inspector.animations' | transloco }}</span>
        <span class="state">{{ 'inspector.project' | transloco }}: {{ store.projectId() }} · {{ 'inspector.filter' | transloco }}: {{ store.skill()?.label ?? '—' }}</span>
      </aside>
    }
  `,
  styles: `
    :host {
      display: block;
    }
    .panel {
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 30;
      width: min(300px, calc(100vw - 40px));
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 18px;
      background: var(--inspect);
      color: #fff;
      font-size: 12px;
      line-height: 1.6;
      box-shadow: 8px 8px 0 var(--ink);
      strong {
        font-size: 13px;
        margin-bottom: 6px;
      }
    }
    .state {
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid rgb(255 255 255 / 0.35);
    }
  `,
})
export class App {
  protected store = inject(PortfolioStore);
  // se inyecta aquí para aplicar el idioma guardado al arrancar
  private language = inject(LanguageService);
}
