import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare var google;

/*
  Generated class for the ShowmapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShowmapProvider {
map: any;
  constructor(public http: HttpClient) {
    console.log('Hello ShowmapProvider Provider');
  }
  ShowMap(mapElement){
    const location = new google.maps.LatLng(18.7769885, 98.9649647);
    const options = {
      center: location,
      zoom: 10
    };
    this.map = new google.maps.Map(mapElement.nativeElement, options);
    
  }
}
