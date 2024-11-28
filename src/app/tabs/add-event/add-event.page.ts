import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/use-cases/event-create.use-case'; // Asegúrate de importar el servicio EventService

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  eventName: string = ''; // Nombre del evento
  eventDescription: string = ''; // Descripción del evento
  eventImage: string | null = null; // URL de la imagen seleccionada

  constructor(
    private router: Router,
    private eventService: EventService // Inyecta el servicio EventService
  ) {}

  ngOnInit() {}

  // Método para manejar la imagen seleccionada
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.eventImage = reader.result as string; // Guardar la imagen como una URL base64
      };
      reader.readAsDataURL(file); // Convertir la imagen a base64
    }
  }

  // Método para guardar el evento
  async saveEvent() {
    if (this.eventName && this.eventDescription && this.eventImage) {
      try {
        const result = await this.eventService.saveEvent(this.eventName, this.eventDescription, this.eventImage);
        if (result.success) {
          // Redirigir a la página principal
          this.router.navigate(['/tabs/home']);
        } else {
          alert(result.message); // Mostrar error si no se pudo guardar
        }
      } catch (error) {
        console.error('Error guardando evento:', error);
        alert('Hubo un error al guardar el evento. Intenta nuevamente.');
      }
    } else {
      alert('Por favor, completa todos los campos');
    }
  }

  // Método para regresar a la página anterior
  onBackButtonPressed() {
    this.router.navigate(['/tabs/home']);
  }
}
