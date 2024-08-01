import { Component, OnInit, Input,} from '@angular/core';
import { Platform } from '@ionic/angular';
import { FormService } from '../form.service';
import { Information } from '../information';
import * as jsPDF from 'jspdf';
import { Clipboard } from '@capacitor/clipboard';
import html2canvas from 'html2canvas';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { PrintService } from '../print.service';
import { FileOpener, FileOpenerOptions } from '@capacitor-community/file-opener';
import * as domtoimage from 'dom-to-image';

@Component({
  // standalone: true,
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
  // imports : [PDFExportModule, ]
})
export class CardsPage implements OnInit {

// proprietes / var 

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
@Input() catalog? : string ;
@Input() id? : number ;
loading: any;

// Methodes / Functions

  constructor(
    private formService : FormService,
    private platform: Platform
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
      // const options = {
      //   scale : 10,
      //   useCORS : true
      // }

      const options = {
        // width: node.offsetWidth * 2,  // Double the width
        // height: node.offsetHeight * 2,  // Double the height
        style: {
          transform: 'scale(2)',
          // transformOrigin: 'top left'
        }
      };
      // Capture the element as an image using dom-to-image
      const imgData2 = await domtoimage.toPng(node, options);

      // Remove the data URL header to get the base64 encoded string
      const base64Data2 = imgData2.split(',')[1];


      // const canvas = await html2canvas(node, options);
      // const imgData = canvas.toDataURL('image/png');
       
      // Create a PDF
      const pdf = new jsPDF.jsPDF('p', 'px', 'a4');
      // const imgProps = pdf.getImageProperties(imgData);
      // const pdfWidth = pdf.internal.pageSize.getWidth();
      // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      // console.log('************',pdfWidth)
      // pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Save the PDF to the file system
      const pdfData = pdf.output('datauristring');
      const base64Data = pdfData.split(',')[1];
      // const img = imgData.split(',')[1];
      // console.log(base64Data)
      if (this.platform.is('capacitor')) {
        const result = await Filesystem.writeFile({
          path: 'carte.png',
          // data: base64Data,
          data: base64Data2,
          directory: Directory.Documents,
          // encoding: Encoding.UTF8
        });
        console.log('PDF saved successfully:', result.uri);
        const fileOpenerOptions: FileOpenerOptions = {
          filePath: result.uri,
          contentType: 'image/png',
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
    this.instagram = this.value?.instagram;
    this.phone = this.value?.phone;
    this.site = this.value?.site;
    this.catalog = this.value?.catalog;
    this.longitude = this.value?.longitude
    this.latitude = this.value?.latitude
    // this.logo = this.value?.logo;

  }

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

}


