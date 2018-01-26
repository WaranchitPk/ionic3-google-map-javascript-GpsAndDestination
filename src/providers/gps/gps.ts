import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';

declare var google;

/*
  Generated class for the GpsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GpsProvider {
  options: GeolocationOptions;
  marker: any;
  map: any;
  public lat;
  public lng;
  constructor(public http: HttpClient, private geolocation: Geolocation) {
    console.log('Hello GpsProvider Provider');
  }
  Gps(mapElement) {
    this.options = {
      enableHighAccuracy: false
    };
    let geo = this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;

      //กำหนดพื้นที่การแสดงจาก ละติจูด และ ลองติจูดที่ได้มาจากการเปิด gps
      const location = new google.maps.LatLng(this.lat, this.lng);
      //กำนหนดออฟชั่นของแผนที่
      const options = {
        center: location,
        zoom: 18
      };
      this.map = new google.maps.Map(mapElement.nativeElement, options);

      this.marker = new google.maps.Marker({
        //กำนหนดตำแหน่งที่จะปัก
        position: location,
        //อนิเมชั่นในตอนปักหมุด
        animation: google.maps.Animation.DROP,
        //กำหนดแผนที่
        map: this.map,
        title: 'p-soft Asia'
      });
      //info Window เป็นคำอธิบายเมื่อกดที่หมุดจะขึ้นแสดง
      let content = "<p>P-Soft Asia !</p>";
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
      //เมื่อคลิ๊กที่หมุด ให้แสดงข้อความตามที่เรากำหนด
      google.maps.event.addListener(this.marker, 'click', () => {
        infoWindow.open(this.map, this.marker);
      });

      // return ค่านี้ให้กลับไปเก็บไว้ ที่ geo เพื่อเตรียมส่งค่ากลับไปใช้งานต่อ
      return {
        lat: this.lat,
        lng: this.lng,
      };
    });
    return geo;
  }
}
