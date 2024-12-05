import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventCreateUseCase } from 'src/app/use-cases/event-create.use-case';

declare var google: any; // Declarar la variable global de Google Maps API

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  eventName: string = ''; // Nombre del evento
  eventDescription: string = ''; // Descripción del evento
  eventImage: string | null = null; // URL de la imagen seleccionada
  eventLocation: string = ''; // Dirección del evento
  locationSuggestions: any[] = []; // Lista de sugerencias de ubicación
  eventDate: string = ''; // Fecha del evento

  constructor(
    private router: Router,
    private eventCreateUseCase: EventCreateUseCase // Inyecta el servicio EventCreateUseCase
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

  // Método para manejar el input de ubicación
  onLocationInput(event: any) {
    const input = event.target.value;
    console.log('Input: ', input);  // Verifica lo que el usuario está escribiendo
    if (input.length > 2) {
      const service = new google.maps.places.AutocompleteService();
      // Aquí combinamos geocode para direcciones completas y establishment para lugares
      service.getPlacePredictions({ 
        input: input, 
        types: ['geocode'], // Incluye 'geocode' para direcciones específicas con números de casa
      }, (predictions: any, status: any) => {
        console.log('Status: ', status);  // Verifica el estado de la respuesta
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log('Predictions: ', predictions);  // Verifica las predicciones obtenidas
          this.locationSuggestions = predictions;
        } else {
          console.error('Error fetching predictions: ', status);  // Maneja posibles errores
        }
      });
    }
  }
  onLocationInputPlaces(event: any) {
    const input = event.target.value;
    console.log('Input: ', input);  // Verifica lo que el usuario está escribiendo
    if (input.length > 2) {
      const service = new google.maps.places.AutocompleteService();
      // Solo 'establishment' o 'point_of_interest' para lugares
      service.getPlacePredictions({ 
        input: input, 
        types: ['point_of_interest'],  // Usamos 'establishment' para lugares específicos
      }, (predictions: any, status: any) => {
        console.log('Status: ', status);  // Verifica el estado de la respuesta
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log('Predictions: ', predictions);  // Verifica las predicciones obtenidas
          this.locationSuggestions = predictions;
        } else {
          console.error('Error fetching predictions: ', status);  // Maneja posibles errores
        }
      });
    }
  }

  // Método para seleccionar una ubicación
  selectLocation(suggestion: any) {
    this.eventLocation = suggestion.description;
    this.locationSuggestions = []; // Limpiar las sugerencias después de seleccionar
  }

  // Método para guardar el evento
  async saveEvent() {
    if (this.eventName && this.eventDescription && this.eventImage && this.eventLocation && this.eventDate) {
      try {
        const googleApiKey = 'AIzaSyAAOa1-_x4NYFBUw5FcNijjW8rptGFguiE'; // Asegúrate de reemplazar esto con tu clave de API de Google Maps

        // Convertir la fecha al formato adecuado (si es necesario)
        const eventDateObject = new Date(this.eventDate);

        const result = await this.eventCreateUseCase.saveEvent(
          this.eventName, 
          this.eventDescription, 
          this.eventImage, 
          this.eventLocation, 
          eventDateObject, // Pasamos la fecha convertida
          googleApiKey // Pasamos la clave de la API
        );

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
