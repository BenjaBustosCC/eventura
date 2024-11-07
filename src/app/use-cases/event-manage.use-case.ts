import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Importa el servicio Firestore
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  constructor(private firestore: AngularFirestore) {}

  // Método para obtener todos los eventos desde Firestore
  getEvents(): Observable<any[]> {
    return this.firestore.collection('events').valueChanges();  // Devuelve un observable con los eventos
  }

  // Método para obtener un solo evento por su ID
  getEventById(id: string): Observable<any> {
    return this.firestore.collection('events').doc(id).valueChanges();  // Devuelve un observable con los datos del evento
  }

  deleteEvent(eventId: string): Promise<void> {
    return this.firestore.collection('events').doc(eventId).delete();
  }
}