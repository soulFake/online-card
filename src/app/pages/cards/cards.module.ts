import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardsPageRoutingModule } from './cards-routing.module';

import { CardsPage } from './cards.page';
import { FrontSideComponent } from "../../components/front-side/front-side.component";
import { BackSideComponent } from '../../components/back-side/back-side.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { FrontSideComponent as FrontSideComponent_1 } from "../../components/style2/front-side/front-side.component";
import { BackSideComponent as BackSideComponent_1 } from "../../components/style2/back-side/back-side.component";
import {jsPDF} from 'jspdf';
import { FrontSideComponent as FrontSideComponent_3 } from "../../components/style3/front-side/front-side.component";
import { FrontSideComponent as FrontSideComponent_4 } from "../../components/style4/front-side/front-side.component";
import { FrontSideComponent as FrontSideComponent_5 } from "../../components/style5/front-side/front-side.component";
import { BackSideComponent as BackSideComponent_3 } from "../../components/style3/back-side/back-side.component";
import { BackSideComponent as BackSideComponent_4 } from "../../components/style4/back-side/back-side.component";
import { BackSideComponent as BackSideComponent_5 } from "../../components/style5/back-side/back-side.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardsPageRoutingModule,
    FrontSideComponent, 
    BackSideComponent,
    PDFExportModule,
    FrontSideComponent_1,
    BackSideComponent_1,
    FrontSideComponent_3,
    BackSideComponent_3,
    FrontSideComponent_4,
    BackSideComponent_4,
    FrontSideComponent_5,
    BackSideComponent_5

],
  declarations: [CardsPage]
})
export class CardsPageModule {}
