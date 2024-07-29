import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
// import { Printer, PrinterOriginal } from '@awesome-cordova-plugins/printer/ngx';
// import { FileOpener } from '@awesome-cordova-plugins/file-opener';
// import { FileOpener } from '@ionic-native/file-opener/ngx';
// import { File } from '@awesome-cordova-plugins/file/ngx';
import { Printer } from '@awesome-cordova-plugins/printer/ngx';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, PDFExportModule, BrowserAnimationsModule],
  providers: [
    // FileOpener,
    // File,
    Printer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
