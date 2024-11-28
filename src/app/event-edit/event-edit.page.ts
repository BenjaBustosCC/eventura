import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventReadUseCase } from '../use-cases/event-read.use-case';
import { EventManagetUseCase } from '../use-cases/event-manage.use-case';
import { Event } from '../use-cases/event-manage.use-case';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.page.html',
  styleUrls: ['./event-edit.page.scss'],
})
export class EditEventPage implements OnInit {
  eventId: string | null = null; // ID del evento a editar
  eventName: string = ''; // Título del evento
  eventDescription: string = ''; // Descripción del evento
  eventImage: string | null = null; // URL de la imagen del evento
  event: Event | null = null; // Propiedad para almacenar el evento completo

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventManagetUseCase: EventManagetUseCase, // Servicio de eventos
    private eventReadUseCase: EventReadUseCase
  ) {}

  ngOnInit() {
    // Obtener el ID desde la URL
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      // Llamar al servicio para obtener los datos del evento
      this.eventReadUseCase.getEventById(this.eventId).subscribe(
        (event) => {
          if (event) {
            this.eventName = event.nombre; // Asignar valores a los campos
            this.eventDescription = event.descripcion;
            this.eventImage = event.imagen;
          }
        },
        (error) => {
          console.error('Error al obtener el evento:', error);
        }
      );
    }
  }

  // Resto de métodos sin cambios
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.eventImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async updateEvent() {
    if (this.eventId) {
      const updatedData: Partial<Event> = {};
      if (this.eventName.trim()) updatedData.nombre = this.eventName;
      if (this.eventDescription.trim()) updatedData.descripcion = this.eventDescription;
      if (this.eventImage) updatedData.imagen = this.eventImage;

      if (Object.keys(updatedData).length > 0) {
        try {
          await this.eventManagetUseCase.updateEvent(this.eventId, updatedData);
          this.router.navigate(['/tabs/home']);
        } catch (error) {
          console.error('Error al actualizar el evento:', error);
          alert('Hubo un error al actualizar el evento.');
        }
      } else {
        alert('No hay cambios para guardar.');
      }
    } else {
      alert('No se encontró el ID del evento.');
    }
  }

  onBackButtonPressed() {
    this.router.navigate(['/tabs/home']);
  }
}