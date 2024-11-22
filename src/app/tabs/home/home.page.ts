import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { homeOutline, locationOutline, duplicateOutline, personOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { EventManagetUseCase } from 'src/app/use-cases/event-manage.use-case';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  events: any[] = []; // Aquí guardas los eventos que has obtenido de Firestore

  constructor(
    private router: Router,
    private eventManagetUseCase: EventManagetUseCase // Inyectas el servicio de eventos
  ) {
    addIcons({
      'home-outline': homeOutline,
      'location-outline': locationOutline,
      'duplicate-outline': duplicateOutline,
      'person-outline': personOutline,
    });
  }

  ngOnInit() {
    this.loadEvents();
  }

  // Cargar los eventos desde Firestore
  loadEvents() {
    this.eventManagetUseCase.getAllEvents().subscribe(events => {
      this.events = events; // Guarda los eventos con sus IDs
      console.log('Eventos obtenidos:', events); // Verifica si los IDs están presentes
    });
  }

  // Método para navegar al evento pasando su 'id'
  onEventButtonPressed(eventId: string) {
    this.router.navigate([`/evento/${eventId}`]); // Pasa el ID en la URL
  }

}
