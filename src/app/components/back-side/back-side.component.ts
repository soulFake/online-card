import { Component, OnInit } from '@angular/core';

import { NgIf } from '@angular/common';
import { Information } from 'src/app/interfaces/information';
import { FormService } from 'src/app/services/formService/form.service';

@Component({
  standalone: true,
  selector: 'app-back-side',
  templateUrl: './back-side.component.html',
  styleUrls: ['./back-side.component.scss'],
  imports: [NgIf]
})
export class BackSideComponent  implements OnInit {
  info?: Information;
  latitude?: string;
  longitude?: string;

  constructor(private formService: FormService){
  }
  ngOnInit(): void {
  this.getInfo();
  
  }
    getInfo():void {
      this.formService.getInfo().subscribe(obj => this.info = obj);
      this.latitude = this.formService.latitude;
      this.longitude = this.formService.longitude;
    }


}
