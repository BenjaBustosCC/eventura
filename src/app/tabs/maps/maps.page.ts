import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
/// <reference types="@types/google.maps" />

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map: google.maps.Map | undefined;

  constructor() {}

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&libraries=places`;
    script.async = true;
    script.defer = true;
  
    script.onload = () => {
      const mapOptions = {
        center: { lat: -33.4489, lng: -70.6693 }, // Coordenadas de ejemplo
        zoom: 14,
      };
  
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    };
  
    document.head.appendChild(script);
  }
  
}
