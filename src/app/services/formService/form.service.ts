import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Information } from '../../interfaces/information';
import { GeolocationService } from '../geolocationService/geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class FormService implements OnInit{
  latitude?: string = "3.8859037";
  longitude?: string = "11.5455675";
  info?:Information = {
    id: 1,
    name:"Soul Company", 
    address: "Yaounde/Mobile Omnisport",
    email: "isnov@enterprise.com",
    catalog: "www.catalog.com",
    facebook: "www.facebook.com",
    instagram: "www.instagram.com",
    site: "www.monsite.com",
    phone: "+237 696 264 793",
    twitter: "www.twitter.com",
    logo: "../assets/isnov2.png",
    latitude: this.latitude,
    longitude: this.longitude,
  };
  imgUrl: string | ArrayBuffer | null | undefined;

  constructor( private geolocationService: GeolocationService) { }

ngOnInit(): void {
  this.getGeoLocation();
}

  getInfo(): Observable <Information> {
    let info = of(this.info!)
    return info;
  }


  getGeoLocation() {
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      },
      error: (error) => {
        console.error('Error getting geolocation:', error);
      },
    });
  }
}
