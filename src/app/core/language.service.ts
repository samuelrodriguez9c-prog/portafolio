import { DOCUMENT, Injectable, inject, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export type Lang = 'es' | 'en';
const KEY = 'portafolio.lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private transloco = inject(TranslocoService);
  private document = inject(DOCUMENT);

  readonly lang = signal<Lang>(this.initial());

  constructor() {
    this.apply(this.lang());
  }

  set(lang: Lang): void {
    this.lang.set(lang);
    this.apply(lang);
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      /* almacenamiento no disponible: se ignora */
    }
  }

  private apply(lang: Lang): void {
    this.transloco.setActiveLang(lang);
    this.document.documentElement.lang = lang;
  }

  private initial(): Lang {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === 'es' || saved === 'en') return saved;
    } catch {
      /* sin acceso a localStorage */
    }
    return navigator.language?.toLowerCase().startsWith('es') === false ? 'en' : 'es';
  }
}
