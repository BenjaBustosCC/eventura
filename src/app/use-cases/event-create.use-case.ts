import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from 'firebase/auth';

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
      // Obtener el usuario actual
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error('Usuario no autenticado');
      }

      // Crear un objeto con los datos del evento
      const eventData = {
        nombre: eventName,
        descripcion: eventDescription,
        imagen: eventImage,
        userId: currentUser.uid, // Asociar el evento al usuario actual
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
}