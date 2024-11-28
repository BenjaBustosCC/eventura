import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventReadUseCase } from '../use-cases/event-read.use-case';
import { Event } from '../use-cases/event-manage.use-case';  // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {
  event: Event | null = null; // Variable para almacenar el evento

  constructor(
    private route: ActivatedRoute,
    private eventReadUseCase: EventReadUseCase
  ) {}

  ngOnInit() {
    // Obtener el ID desde la URL
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      // Llamar al servicio para obtener los datos del evento
      this.eventReadUseCase.getEventById(eventId).subscribe(
        (event) => {
          this.event = event; // Guardar los datos en la variable
        },
        (error) => {
          console.error('Error al obtener el evento:', error);
        }
      );
    }
  }

  onBackButtonPressed() {
    // Lógica para volver a la vista anterior
    window.history.back();
  }
}