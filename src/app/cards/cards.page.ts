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
loading: boolean = false;

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
  this.loading = !this.loading;
  
  if (node) {
    try {

      const options = {
        quality: 1,  // Maximum quality
        width: node.scrollWidth * 2,  // Double the width for higher quality
        height: node.scrollHeight * 2,  // Double the height for higher quality
        style: {
          transform: 'scale(2)',  // Scale up for higher quality
          transformOrigin: 'top left',
          width: node.scrollWidth + 'px',
          height: node.scrollHeight + 'px'
        }
      };
      // Capture the element as an image using dom-to-image
      const imgData = await domtoimage.toPng(node, options);
       
      // Create a PDF
      const pdf = new jsPDF.jsPDF('p', 'px', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Save the PDF to the file system
      const pdfData = pdf.output('datauristring');
      const base64Data = pdfData.split(',')[1];
      if (this.platform.is('capacitor')) {
        const result = await Filesystem.writeFile({
          path: `carte${Date.now().toString()}.pdf`,
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
        pdf.save(`exported-${Date.now().toString()}.pdf`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'exportation en PDF :', error);
    }
  } else {
    console.error('Élément non trouvé.');
  }
  this.loading = !this.loading;
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
    this.formService.info!.phone = this.phone;
    this.formService.info!.address = this.address;
    this.formService.info!.facebook = this.facebook;
    this.formService.info!.instagram = this.instagram;
    this.formService.info!.twitter = this.twitter;
    this.formService.info!.phone = this.phone;

  }

}