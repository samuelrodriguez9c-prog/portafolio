import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { TIMELINE } from '../../core/portfolio.data';
import { InspectTag } from '../../shared/inspect-tag';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-timeline',
  imports: [TranslocoPipe, InspectTag, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="timeline" class="timeline inspectable">
      <app-inspect-tag label='<app-git-log rama="main">' />
      <div class="container wrap">
        <div class="intro">
          <h2 class="display section-title" appReveal>{{ 'timeline.title' | transloco }}</h2>
          <p class="mono cmd" appReveal [revealDelay]="80">$ git log --oneline samuel</p>
        </div>
        <ol>
          @for (c of entries; track c.key; let i = $index) {
            <li appReveal [revealDelay]="i * 70">
              <div class="rail">
                <span class="node" [class.head]="c.head" [class.root]="c.root"></span>
                <span class="line"></span>
              </div>
              <div class="body">
                <div class="mono top">
                  <span class="tag" [class.head]="c.head" [class.root]="c.root">{{ c.tag }}</span>
                  <span class="date">{{ 'timeline.' + c.key + '.date' | transloco }}</span>
                </div>
                <span class="title">{{ 'timeline.' + c.key + '.title' | transloco }}</span>
                <span class="text">{{ 'timeline.' + c.key + '.body' | transloco }}</span>
              </div>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    .timeline {
      background: var(--ink);
      color: var(--paper);
      border-bottom: var(--border);
    }
    .wrap {
      padding-block: 88px;
      display: flex;
      flex-wrap: wrap;
      gap: 48px;
    }
    .intro {
      flex: 1 1 300px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .cmd {
      margin: 0;
      font-size: 14px;
      color: var(--muted-dark);
    }
    ol {
      flex: 2 1 560px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    li {
      display: flex;
      gap: 20px;
    }
    .rail {
      flex: 0 0 22px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .node {
      width: 16px;
      height: 16px;
      margin-top: 4px;
      border-radius: 50%;
      border: 3px solid var(--paper);
      background: var(--ink);
      transition: transform 0.3s var(--ease);
      &.head {
        border-color: var(--accent);
        background: var(--accent);
      }
      &.root {
        border-color: var(--muted-dark);
        background: var(--muted-dark);
      }
    }
    li:hover .node {
      transform: scale(1.25);
    }
    .line {
      flex-grow: 1;
      width: 2px;
      background: #3a3a36;
    }
    li:last-child .line {
      background: transparent;
    }
    .body {
      flex-grow: 1;
      padding-bottom: 36px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .top {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
      font-size: 13px;
    }
    .tag {
      padding: 2px 8px;
      background: var(--paper);
      color: var(--ink);
      font-weight: 700;
      &.head {
        background: var(--accent);
      }
      &.root {
        background: var(--muted-dark);
      }
    }
    .date {
      color: var(--muted-dark);
    }
    .title {
      font-size: 22px;
      font-weight: 600;
    }
    .text {
      font-size: 15px;
      line-height: 1.55;
      color: #c9c9c2;
    }
  `,
})
export class Timeline {
  protected readonly entries = TIMELINE;
}
