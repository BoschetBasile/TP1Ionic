import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
  latitude: number;
  longitude: number;
  map: GoogleMap;

  constructor(private geolocation: Geolocation,
              private googleMaps: GoogleMaps,
              public navCtrl: NavController, ) {
  }

  getCurrentPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
    });
  }

  watchPosition() {
      const mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: this.latitude,
            lng: this.longitude
          },
          zoom: 18,
          tilt: 30
        }
      };

      this.map = GoogleMaps.create('map_canvas', mapOptions);

      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          console.log('Map is ready!');

          this.map.addMarker({
              title: 'Ionic',
              icon: 'blue',
              animation: 'DROP',
              position: {
                lat: this.latitude,
                lng: this.longitude
              }
            })
            .then(marker => {
              marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  alert('clicked');
                });
            });
        });
    }
  }

