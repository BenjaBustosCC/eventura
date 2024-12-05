import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from 'firebase/auth';
import { HttpClient } from '@angular/common/http'; // Para llamar a la API de Geocoding

@Injectable({
  providedIn: 'root',
})
export class EventCreateUseCase {

  private googleApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json'; // URL de la API Geocoding de Google

  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient // Inyectar el servicio HttpClient
  ) {}

  // Método principal para guardar el evento
  async saveEvent(
    eventName: string,
    eventDescription: string,
    eventImage: string | null,
    eventLocation: string, // Dirección como texto
    eventDate: Date,
    googleApiKey: string // La clave de la API de Google Maps
  ): Promise<{ success: boolean; message: string; eventId?: string }> {
    try {
      // Obtener el usuario actual
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error('Usuario no autenticado');
      }

      // Convertir la dirección en coordenadas usando Google Geocoding API
      const coordinates = await this.getCoordinates(eventLocation, googleApiKey);

      if (!coordinates) {
        throw new Error('No se pudo obtener la ubicación de la dirección proporcionada');
      }

      // Crear un objeto con los datos del evento
      const eventData = {
        nombre: eventName,
        descripcion: eventDescription,
        imagen: eventImage,
        ubicacion: eventLocation, // Guardar la dirección como texto
        coordenadas: coordinates, // Guardar las coordenadas
        fecha: eventDate,
        userId: currentUser.uid,
        createdAt: new Date(),
      };

      // Guardar el evento en Firestore en la colección "events"
      const docRef = await this.firestore.collection('events').add(eventData);

      // Agregar el ID al documento creado (opcional)
      await docRef.update({ id: docRef.id });

      return { success: true, message: 'Evento guardado con éxito', eventId: docRef.id };

    } catch (error: any) {
      return { success: false, message: `Error al guardar el evento: ${error.message}` };
    }
  }

  // Método para obtener las coordenadas a partir de una dirección
  private async getCoordinates(address: string, apiKey: string): Promise<{ lat: number; lng: number } | null> {
    const url = `${this.googleApiUrl}?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
      // Llamada a la API de Geocoding
      const response = await this.http.get<any>(url).toPromise();
      
      // Si la respuesta es exitosa y tiene resultados
      if (response.status === 'OK' && response.results.length > 0) {
        const location = response.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };  // Devuelve las coordenadas
      }
      // Si no se obtuvieron coordenadas
      return null;
    } catch (error) {
      console.error('Error al obtener las coordenadas:', error);
      return null;
    }
  }
}
