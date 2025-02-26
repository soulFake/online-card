/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import '@angular/compiler';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
