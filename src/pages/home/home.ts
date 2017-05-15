import { Component } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any;

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation
  ) {}

  ionViewDidLoad(){
    this.obtenerPosicion();
  }

  obtenerPosicion():any{
    this.geolocation.getCurrentPosition().then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  loadMap(postion: Geoposition){
    let latitude = postion.coords.latitude;
    let longitude = postion.coords.longitude;
    
    let mapEle: HTMLElement = document.getElementById('map');

    let myLatLng = {lat: latitude, lng: longitude};

    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
      mapEle.classList.add('show-map');
    });
  }
}
