import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { PortfolioStore } from '../../core/portfolio.store';
import { InspectTag } from '../../shared/inspect-tag';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-stack',
  imports: [TranslocoPipe, InspectTag, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="stack" class="stack blueprint inspectable">
      <app-inspect-tag label='<app-stack (filtrar)="explorador.filtro = $event">' />
      <div class="container wrap">
        <div class="section-head">
          <h2 class="display section-title" appReveal>Stack</h2>
          <p appReveal [revealDelay]="80">{{ 'stack.intro' | transloco }}</p>
        </div>

        <div class="chips" appReveal [revealDelay]="120">
          @for (k of store.skills; track k.id) {
            <button
              type="button"
              class="chip"
              [class.active]="k.id === store.skillId()"
              [attr.aria-pressed]="k.id === store.skillId()"
              (click)="store.toggleSkill(k.id)"
            >
              {{ k.label }}<span class="mono count">{{ store.skillCount(k.id) }}</span>
            </button>
          }
        </div>

        @if (store.skill(); as skill) {
          <div class="result mono" animate.enter="anim-rise" animate.leave="anim-leave">
            <span class="accent">{{ skill.label }}</span>
            <span>→ {{ usedIn() }}</span>
            <a href="#projects">{{ 'stack.seeProjects' | transloco }} ↑</a>
          </div>
        }

        <p class="also">{{ 'stack.also' | transloco }}</p>
      </div>
    </section>
  `,
  styles: `
    .stack {
      border-bottom: var(--border);
    }
    .wrap {
      padding-block: 88px;
      display: flex;
      flex-direction: column;
      gap: 36px;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      min-height: 52px;
      padding: 0 18px;
      border: var(--border);
      background: var(--paper-2);
      font-size: 17px;
      font-weight: 500;
      transition: background-color 0.25s var(--ease), color 0.25s var(--ease), transform 0.25s var(--ease),
        box-shadow 0.25s var(--ease);
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 0 var(--ink);
      }
      &:active {
        transform: scale(0.98);
      }
      &.active {
        background: var(--ink);
        color: var(--paper);
      }
      &.active .count {
        background: var(--accent);
      }
    }
    .count {
      padding: 2px 7px;
      background: var(--line);
      color: var(--ink);
      font-size: 12px;
      transition: background-color 0.25s var(--ease);
    }
    .result {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      padding: 18px 20px;
      background: var(--ink);
      color: var(--paper);
      font-size: 14px;
      a {
        margin-left: auto;
        text-decoration: underline;
      }
    }
    .accent {
      color: var(--accent);
    }
    .also {
      margin: 0;
      font-size: 15px;
      color: var(--muted);
    }
  `,
})
export class Stack {
  protected store = inject(PortfolioStore);
  protected readonly usedIn = computed(() =>
    this.store
      .projectsWithSkill()
      .map((p) => p.name)
      .join(' · '),
  );
}
