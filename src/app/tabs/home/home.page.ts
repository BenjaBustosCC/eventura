import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { homeOutline, locationOutline, duplicateOutline, personOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { EventService } from 'src/app/use-cases/event-manage.use-case';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  events: any[] = [];  // Aquí guardas los eventos que has obtenido de Firestore

  constructor(
    private router: Router,
    private eventService: EventService  // Inyectas el servicio de eventos
  ) {
    addIcons({
      'home-outline': homeOutline,
      'location-outline': locationOutline,
      'duplicate-outline': duplicateOutline,
      'person-outline': personOutline,
    });
  }

  ngOnInit() {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;  // Suponiendo que 'getEvents()' devuelve un array de eventos de Firestore
    });
  }

  // Método para navegar al evento pasando su 'id'
  onEventButtonPressed(eventId: string) {
    this.router.navigate([`/evento/${eventId}`]);  // Pasa el ID en la URL
  }

  async deleteEvent(eventId: string) {
    try {
      // Eliminar el evento de la base de datos
      await this.eventService.deleteEvent(eventId);
  
      // Eliminar el evento de la lista localmente
      this.events = this.events.filter(event => event.id !== eventId);
  
      console.log('Evento eliminado de la base de datos y de la vista');
    } catch (error) {
      console.error('Error al eliminar evento:', error);
    }
  }
}