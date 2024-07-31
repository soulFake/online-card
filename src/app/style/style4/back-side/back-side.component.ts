import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/form.service';
import { Information } from 'src/app/information';

@Component({
  standalone: true,
  selector: 'app-back-side-4',
  templateUrl: './back-side.component.html',
  styleUrls: ['./back-side.component.scss'],
  imports : [NgIf],
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
