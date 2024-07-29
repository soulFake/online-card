import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BackSideComponent } from '../back-side/back-side.component';
import { IonHeader, IonContent } from "@ionic/angular/standalone";
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { AnimationController, LoadingController, Platform } from '@ionic/angular';
import { FormService } from '../form.service';
import { Information } from '../information';
import * as jsPDF from 'jspdf';
import { Clipboard } from '@capacitor/clipboard';
import html2canvas from 'html2canvas';
// import domtoimage from 'dom-to-image';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { PrintService } from '../print.service';
import { FileOpener, FileOpenerOptions } from '@capacitor-community/file-opener';

@Component({
  // standalone: true,
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
  // imports : [PDFExportModule, ]
})
export class CardsPage implements OnInit {
frontSide : boolean = true;
selectedOption?: number = 1;
value?: Information;

@Input() company? : string ;
@Input() logo? : string ;
@Input() email? : string ;
@Input() phone? : string ;
@Input() facebook? : string ;
@Input() twitter? : string ;
@Input() instagram? : string ;
@Input() location? : string ;
@Input() longitude? : string ;
@Input() latitude? : string ;
@Input() address? : string ;
@Input() site? : string ;
// @Input() latitude? : string ;
// @Input() longitude? : string ;
@Input() id? : number ;
loading: any;

  constructor(private animationCtrl: AnimationController, private formService : FormService,
    //  public printer: Printer
    // private printer: Printer
    // public loadingCtrl: LoadingController,
    // private fileOpener: FileOpener,
    private printService: PrintService,
    // private file: File,
    private platform: Platform
    // private fileOpener: FileOpener
    ) { }

  


// ******************************************************************
// *                         !important                             *
// ******************************************************************

   async writeToClipboard () {
  await Clipboard.write({
    string: "https://www.google.com/maps?q=" + this.latitude + "," + this.longitude
  });
};


async exportAsPDF() {
  const node = document.getElementById('myLucky');

  if (node) {
    try {
      // Capture the element as an image
      const canvas = await html2canvas(node);
      const imgData = canvas.toDataURL('image/png');
      
      // Create a PDF
      const pdf = new jsPDF.jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Save the PDF to the file system
      const pdfData = pdf.output('datauristring');
      const base64Data = pdfData.split(',')[1];
      // console.log(base64Data)
      if (this.platform.is('capacitor')) {
        const result = await Filesystem.writeFile({
          path: 'carte.pdf',
          data: base64Data,
          directory: Directory.Documents,
          // encoding: Encoding.UTF8
        });
        console.log('PDF saved successfully:', result.uri);
        const fileOpenerOptions: FileOpenerOptions = {
          filePath: result.uri,
          contentType: 'application/pdf',
          openWithDefault: true,
        };
        // Open the PDF
        await FileOpener.open(fileOpenerOptions);
      } else {
        // For web: download the PDF
        pdf.save('exported-document.pdf');
      }
    } catch (error) {
      console.error('Erreur lors de l\'exportation en PDF :', error);
    }
  } else {
    console.error('Élément non trouvé.');
  }
}


    public printContent(): void {
      const element = document.getElementById('printer');
      if (element) {
        const printContent = element.innerHTML;
        this.printService.print(printContent);
      } else {
        console.error('Element not found!');
      }
    }




  ngOnInit() {
    this.platform.ready().then(() => {
      console.log('Platform ready, plugins available');
    });
    this.getInfo();
    this.initData();
  }


  changeFace(): void {
    this.frontSide = !this.frontSide;
    console.log(this.frontSide);
  }

  getInfo():void {
    this.formService.getInfo().subscribe(obj => this.value = obj);
  }
  initData(): void{
    this.company = this.value?.name;
    this.address = this.value?.address;
    this.email = this.value?.email;
    this.facebook = this.value?.facebook;
    this.twitter = this.value?.twitter;
    this.phone = this.value?.phone;
    this.longitude = this.value?.longitude
    this.latitude = this.value?.latitude
    // this.logo = this.value?.logo;

  }
  @ViewChild('myCard', {static: false}) myCard?: ElementRef;

  // public downloadPDF() {
  //   const doc = new jsPDF();

    

  //   const html = this.myCard?.nativeElement.innerHTML;

  //   doc.html(html);

  //   doc.save('test.pdf');
  // }

  pushData(): void {
    this.formService.info!.name = this.company;
    this.formService.info!.email = this.email;
    // this.infoService.info!.logo = this.logo;
    this.formService.info!.phone = this.phone;
    // this.formService.info!.latitude = this.latitude;
    // this.formService.info!.longitude = this.longitude;
    this.formService.info!.address = this.address;
    this.formService.info!.facebook = this.facebook;
    this.formService.info!.instagram = this.instagram;
    this.formService.info!.twitter = this.twitter;
    this.formService.info!.phone = this.phone;

  }


  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;
    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root!.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root!.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  // downloadInvoice() {
  //   this.content = document.getElementById('PrintInvoice').innerHTML;
  //   let options = {
  //     documentSize: 'A4',
  //     type: 'share',
  //     // landscape: 'portrait',
  //     fileName: 'Order-Invoice.pdf'
  //   };
  //   this.pdfGenerator.fromData(this.content, options)
  //     .then((base64) => {
  //       console.log('OK', base64);
  //     }).catch((error) => {
  //       console.log('error', error);
  //     });
  //   }

  // printTo() {
  //   var element = document.getElementById('printer');
  //   html2canvas(element!, { allowTaint : true }).then((canvas) =>
  //   {
  //     canvas.getContext('2d');
  //     var image = canvas.toDataURL('image/jpeg', 1.0).replace("image/png", "image/octet-stream");;
  //     window.location.href = image;
  //       });    // let content = document.getElementById('printer')?.innerHTML;
  //   // // this.printer.isAvailable().then(onSuccess, onError);
  //   // let options: PrintOptions = {
  //   //         name: 'MyDocument',
  //   //         duplex: true,
  //   //         orientation: 'landscape',
  //   //         monochrome: true
  //   //    }
      
  //   //    this.printer.print(content, options);
  // // this.printer.isAvailable().then((onSuccess: any) => {
  // //   let content = document.getElementById('printer')?.innerHTML;
  // //   content = content?.replace(/(\r\n|\n|\r)/gm, '' );
  // //   let options: PrintOptions = {
  // //   name: 'MyDocument',
  // //   duplex: true,
  // //   orientation: "portrait",
  // //   monochrome: true
  // //   };
  //   // cordova.plugins.printer(content);
  //   // Printer.print(content, options)
  //   // this.printer.print(content, options).then((value: any) => {
  //   // console.log('value:', value);
  //   // }, (error) => {
  //   // console.log('eror:', error);
  //   // });
  //   // }, (err) => {
  //   // console.log('err:', err);
  //   // });
  // }
  
}


