import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/formService/form.service';
import { Information } from 'src/app/interfaces/information';
import { IsaLogoComponent } from "../../../components/isa-logo/isa-logo.component";

@Component({
  standalone: true,
  selector: 'app-front-side-5',
  templateUrl: './front-side.component.html',
  styleUrls: ['./front-side.component.scss'],
  imports: [UpperCasePipe, IsaLogoComponent],

})
export class FrontSideComponent  implements OnInit {
  value?: Information ;

  constructor(private formService: FormService) { }

  ngOnInit(): void {
    this.getInfo();
    
    }
      getInfo():void {
        this.formService.getInfo().subscribe(obj => this.value = obj);
      }

}
