import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { PortfolioStore } from '../core/portfolio.store';

/** Etiqueta azul con el nombre del componente; solo visible en modo inspector. */
@Component({
  selector: 'app-inspect-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (store.inspect()) {
      <span class="tag mono" animate.enter="anim-pop" animate.leave="anim-leave">{{ label() }}</span>
    }
  `,
  styles: `
    :host {
      position: absolute;
      top: 12px;
      left: 12px;
      z-index: 5;
      pointer-events: none;
    }
    .tag {
      display: inline-block;
      padding: 4px 8px;
      background: var(--inspect);
      color: #fff;
      font-size: 12px;
    }
  `,
})
export class InspectTag {
  readonly label = input.required<string>();
  protected store = inject(PortfolioStore);
}
