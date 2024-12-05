import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventReadUseCase } from '../use-cases/event-read.use-case';
import { Event } from '../use-cases/event-manage.use-case';  // Asegúrate de que la ruta sea correcta
import { DatePipe } from '@angular/common'; // Asegúrate de importar DatePipe
import { Timestamp } from 'firebase/firestore';


@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
  providers: [DatePipe], // Proveedor de DatePipe
})
export class EventoPage implements OnInit {
  event: Event | null = null; // Variable para almacenar el evento
  loading: boolean = true; // Para controlar el estado de carga
  errorMessage: string | null = null; // Para almacenar un mensaje de error

  constructor(
    private route: ActivatedRoute,
    private eventReadUseCase: EventReadUseCase,
    private datePipe: DatePipe // Inyectar DatePipe
  ) {}

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventReadUseCase.getEventById(eventId).subscribe(
        (event) => {
          if (event) {
            this.event = event;
            
            // Verificar si la fecha es un Timestamp y convertirla
            if (event.fecha instanceof Timestamp) {
              this.event.fecha = event.fecha.toDate();  // Directamente asigna el Date
            }

            this.loading = false; // Cambiar estado de carga
          } else {
            this.errorMessage = 'Evento no encontrado'; // Mostrar mensaje si no se encuentra el evento
            this.loading = false;
          }
        },
        (error) => {
          console.error('Error al obtener el evento:', error);
          this.errorMessage = 'Hubo un problema al cargar los datos del evento'; // Mensaje de error
          this.loading = false;
        }
      );
    } else {
      this.errorMessage = 'ID del evento no válido'; // Si no se encuentra un ID en la URL
      this.loading = false;
    }
  }

  onBackButtonPressed() {
    window.history.back();
  }
}
