import { Injectable } from '@angular/core';
import { Printer } from '@awesome-cordova-plugins/printer/ngx';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(private printer: Printer) {}

  print(content: string): void {
    this.printer.print(content).then(() => {
      console.log('Printing...');
    }).catch((error) => {
      console.error('Printing error:', error);
    });
  }}
