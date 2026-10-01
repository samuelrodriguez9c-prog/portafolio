import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageService } from '../core/language.service';
import { PortfolioStore } from '../core/portfolio.store';

@Component({
  selector: 'app-nav',
  imports: [TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  protected store = inject(PortfolioStore);
  protected language = inject(LanguageService);
  protected readonly links = ['projects', 'timeline', 'stack', 'contact'] as const;
}
