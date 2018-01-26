import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

/*
  Generated class for the DirectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DirectionProvider {
  start: string;
  destination: string;
  constructor(public http: HttpClient, private launchNavigator: LaunchNavigator) {
    console.log('Hello DirectionProvider Provider');
    //destination, Receive Location From Controller
    this.destination = "13.8579794, 100.5373748";
  }

  DirectionGpsToController(latGps, lngGps) {
    //Latitude and Longtitude to recieve from GPS is data type Number
    //But value start and destination is type string only
    //So, You have Convert data type from Number to String

    //Convert Data type Number to String, You can use toString()
    // Example : a.toString();
    this.start = `${latGps.toString()},${lngGps.toString()}`;

    let options: LaunchNavigatorOptions = {
      start: this.start
    };
    this.launchNavigator.navigate(this.destination, options)
      .then(
      success => alert('Launched navigator'),
      error => alert('Error launching navigator: ' + error)
      );
  }
}
