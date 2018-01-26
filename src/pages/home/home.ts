import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShowmapProvider } from '../../providers/showmap/showmap';
import { GpsProvider } from '../../providers/gps/gps';
import { DirectionProvider } from '../../providers/direction/direction';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    ShowmapProvider,
    GpsProvider,
    DirectionProvider
  ]
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  latGPS: any;
  lngGPS: any;
  get location() {
    return this.locationGps
  }
  constructor(public navCtrl: NavController,
    private showMap: ShowmapProvider,
    private locationGps: GpsProvider,
    private directionFromGps: DirectionProvider) {
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.showMap.ShowMap(this.mapElement);
    }, 1000);
  }

  doAsyncTask() {
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        let gpss = this.locationGps.Gps(this.mapElement);
        resolve(gpss);
      }, 1000);
    });
    return promise;
  }
  showLocationFromGps() {
    this.doAsyncTask().then((res) => {
      alert(res["lat"]);
      this.latGPS = res["lat"];
      this.lngGPS = res["lng"];
    });
  }
  //Direction
  Direction() {
    this.directionFromGps.DirectionGpsToController(this.latGPS, this.lngGPS)
  }
}
