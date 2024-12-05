import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';  
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getAuth } from 'firebase/auth';


export interface Event {
  id?: string; // ID opcional
  nombre: string;
    descripcion: string;
    imagen: string;
    ubicacion: string;
    coordenadas: {
      lat: number;
      lng: number;
    };
    fecha: Date;
    userId: string;
    createdAt: Date;
  }

@Injectable({
  providedIn: 'root',
})
export class EventManagetUseCase {
  constructor(private firestore: AngularFirestore) {}

  // Método para obtener todos los eventos por id
  getEvents(): Observable<Event[]> {
    const auth = getAuth();
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }
  
    return this.firestore
      .collection('events', (ref) => ref.where('userId', '==', currentUser.uid))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Event;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  // Método para obtener todos los eventos sin filtrar por usuario
  getAllEvents(): Observable<Event[]> {
    return this.firestore
      .collection('events') // No se aplica filtro alguno
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Event;
            const id = a.payload.doc.id;
            return { id, ...data }; // Combina el ID con los datos del evento
          })
        )
      );
  }

  updateEvent(id: string, data: Partial<Event>): Promise<void> {
    return this.firestore.collection('events').doc(id).update(data);
  }
  
  // Método para eliminar un evento por su id
  async deleteEvent(id: string): Promise<{ success: boolean; message: string }> {
    try {
      await this.firestore.collection('events').doc(id).delete();
      return { success: true, message: 'Evento eliminado con éxito' };
    } catch (error: any) {
      return { success: false, message: `Error al eliminar el evento: ${error.message}` };
    }
  }
}
