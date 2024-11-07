import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, locationOutline, duplicateOutline, personOutline } from 'ionicons/icons';
import { EventsUseCase } from 'src/app/use-cases/event-read.use-case';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  events: any[] = [];  // Lista para almacenar los eventos

  constructor(
    private router: Router,
    private eventsUseCase: EventsUseCase  // Inyectamos el UseCase
  ) {
    addIcons({
      'home-outline': homeOutline,
      'location-outline': locationOutline,
      'duplicate-outline': duplicateOutline,
      'person-outline': personOutline,
    });
  }

  ngOnInit() {
    // Obtener los eventos desde el use-case cuando se cargue la página
    this.eventsUseCase.getEvents().subscribe((events) => {
      console.log('Eventos recibidos:', events);  // Agregamos un log para ver los datos
      this.events = events.map((event) => ({
        name: event.nombre,  // Cambia 'name' por 'nombre'
        description: event.descripcion,  // Cambia 'description' por 'descripcion'
        image: event.imagen,  // Cambia 'image' por 'imagen'
      }));
    });
  }

  onEventButtonPressed() {
    this.router.navigate(['/evento']);
  }
}