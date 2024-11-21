import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';  
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Event {
  id?: string; // ID opcional
  nombre: string;
  descripcion: string;
  imagen: string;
  userId: string;
  createdAt: any; // Puede ser `Date` o `firebase.firestore.Timestamp`
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private firestore: AngularFirestore) {}

  // Método para obtener todos los eventos incluyendo su ID
  getEvents(): Observable<Event[]> {
    return this.firestore.collection('events').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Event; // Asegúrate de que sea del tipo Event
          const id = a.payload.doc.id; // ID del documento
          return { id, ...data }; // Combina ID y datos
        })
      )
    );
  }

  // Método para eliminar un evento por su ID
  async deleteEvent(id: string): Promise<{ success: boolean; message: string }> {
    try {
      await this.firestore.collection('events').doc(id).delete();
      return { success: true, message: 'Evento eliminado con éxito' };
    } catch (error: any) {
      return { success: false, message: `Error al eliminar el evento: ${error.message}` };
    }
  }
}
