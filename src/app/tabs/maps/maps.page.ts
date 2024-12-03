import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any; // Para evitar errores de TypeScript con Google Maps

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  map: any; // Variable para el mapa
  location: any = {}; // Para almacenar la ubicación actual

  constructor() {}

  ngOnInit() {
    this.initMap(); // Inicializar el mapa al cargar la página
  }

  async initMap() {
    // Establecer una ubicación inicial por defecto
    const defaultLatLng = new google.maps.LatLng(-33.4489, -70.6693); // Santiago, Chile

    const mapOptions = {
      center: defaultLatLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  async getPosition() {
    try {
      // Obtener la ubicación actual
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });

      // Guardar la ubicación actual
      this.location = position.coords;

      // Actualizar el centro del mapa
      const latLng = new google.maps.LatLng(
        this.location.latitude,
        this.location.longitude
      );

      this.map.setCenter(latLng);

      // Agregar un marcador en la ubicación actual
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
