import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Asegúrate de importar AngularFirestore
import { Router } from '@angular/router'; // Para la navegación
import { Event } from 'src/app/use-cases/event-location.use-case'; // La interfaz Event

declare var google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  map: any;
  location: any = {};
  events: Event[] = []; // Array para los eventos cercanos

  constructor(
    private firestore: AngularFirestore, // Inyectamos AngularFirestore para interactuar con Firestore
    private router: Router // Para navegación
  ) {}

  ngOnInit() {
    this.initMap();
    this.getPosition(); // Obtener la ubicación primero
  }

  async initMap() {
    const defaultLatLng = new google.maps.LatLng(-33.4489, -70.6693); // Latitud y longitud por defecto
    const mapOptions = {
      center: defaultLatLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  async getPosition() {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });

      this.location = position.coords;

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

      // Ahora que tenemos la ubicación, cargamos los eventos cercanos
      this.loadEvents();
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

  // Método para cargar los eventos desde Firestore
  loadEvents() {
    if (!this.location.latitude || !this.location.longitude) {
      console.error('Ubicación no disponible.');
      return;
    }

    this.firestore
      .collection('events') // Seleccionamos la colección de eventos en Firestore
      .get() // Obtenemos todos los documentos de la colección
      .subscribe((querySnapshot) => {
        this.events = []; // Limpiamos el array de eventos antes de llenarlo

        querySnapshot.forEach((doc) => {
          const eventData = doc.data() as Event; // Usamos la interfaz Event
          const eventCoordinates = eventData.coordenadas;

          // Verificar si las coordenadas del evento son válidas
          if (eventCoordinates && eventCoordinates.lat && eventCoordinates.lng) {
            const distance = this.calculateDistance(
              this.location.latitude,
              this.location.longitude,
              eventCoordinates.lat,
              eventCoordinates.lng
            );

            // Filtrar eventos dentro de un radio de 10 km
            if (distance <= 10) {
              this.events.push(eventData);
              this.addMarker(eventCoordinates, eventData.nombre, doc.id); // Añadimos el marcador con el ID del evento
            }
          }
        });
      });
  }

  // Método para calcular la distancia entre dos coordenadas
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en kilómetros
  }

  // Método para convertir grados a radianes
  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Método para añadir el marcador en el mapa
  addMarker(coordinates: { lat: number; lng: number }, title: string, eventId: string) {
    const latLng = new google.maps.LatLng(coordinates.lat, coordinates.lng);
  
    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: title,
      icon: {
        url: 'assets/img/logo_rojo.png', // Ruta del icono
        size: new google.maps.Size(50, 50),
        scaledSize: new google.maps.Size(50, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 40),
      }
    });

    // Añadir un evento de clic en el marcador para redirigir al evento
    marker.addListener('click', () => {
      this.router.navigate([`/evento/${eventId}`]); // Redirigir a la página del evento usando su ID
    });
  }
}
