import { Component } from '@angular/core';
import { TranslationService } from '@core/i18n';

import {locale as enLang} from '@core/i18n/vocabs/en';
import {locale as chLang} from '@core/i18n/vocabs/ch';
import {locale as esLang} from '@core/i18n/vocabs/es';
import {locale as jpLang} from '@core/i18n/vocabs/jp';
import {locale as deLang} from '@core/i18n/vocabs/de';
import {locale as frLang} from '@core/i18n/vocabs/fr';

@Component({
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'article-backoffice-client';

  constructor(private translationService: TranslationService) {
    // register translations
    this.translationService.loadTranslations(
      enLang,
      chLang,
      esLang,
      jpLang,
      deLang,
      frLang
    );
  }

  ngOnInit() {}
}
