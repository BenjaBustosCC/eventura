import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  map: any; 
  location: any = {}; 

  constructor() {}

  ngOnInit() {
    this.initMap(); 
  }

  async initMap() {
    //ubicación inicial por defecto (Santiago)
    const defaultLatLng = new google.maps.LatLng(-33.4489, -70.6693);

    const mapOptions = {
      center: defaultLatLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  async getPosition() {
    try {
      //ubicación actual
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });

      //guarda la ubicación actual
      this.location = position.coords;

      //actualiza el centro del mapa
      const latLng = new google.maps.LatLng(
        this.location.latitude,
        this.location.longitude
      );

      this.map.setCenter(latLng);

      //agrega un marcador en la ubicación actual
      new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: '¡Estás aquí!',
      });
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }
}
