import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppConfig } from './environments/environment';
import {enableAkitaProdMode} from "@node_modules/@datorama/akita";

if (AppConfig.production) {
  enableProdMode();
}
enableAkitaProdMode();

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    preserveWhitespaces: false
  })
  .catch(err => console.error(err));
