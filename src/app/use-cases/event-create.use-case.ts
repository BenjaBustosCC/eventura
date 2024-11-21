import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  constructor(private firestore: AngularFirestore) {}

  async saveEvent(
    eventName: string,
    eventDescription: string,
    eventImage: string
  ): Promise<{ success: boolean; message: string; eventId?: string }> {
    try {
      // Crear un objeto con los datos del evento
      const eventData = {
        nombre: eventName,
        descripcion: eventDescription,
        imagen: eventImage,
        createdAt: new Date(), // opcional, para guardar la fecha de creación
      };

      // Guardar el evento en Firestore en la colección "events"
      const docRef = await this.firestore.collection('events').add(eventData);

      // Agregar el ID al evento (opcional, si lo necesitas en el documento)
      await docRef.update({ id: docRef.id });

      return { success: true, message: 'Evento guardado con éxito', eventId: docRef.id };

    } catch (error: any) {
      // Manejo de errores y mensajes
      let errorMessage = 'Ocurrió un error al guardar el evento';
      errorMessage += ': ' + error.message;

      return { success: false, message: errorMessage };
    }
  }
}
