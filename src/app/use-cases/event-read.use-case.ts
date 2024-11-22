import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from './event-manage.use-case';


@Injectable({
  providedIn: 'root',
})
export class EventReadUseCase {
  constructor(private firestore: AngularFirestore) {}

    // Método para obtener todos los eventos desde Firestore
    getEvents(): Observable<Event[]> {
      return this.firestore.collection<Event>('events').valueChanges();
    }

  // Método para obtener un evento por ID
  getEventById(id: string): Observable<Event | null> {
    return this.firestore
      .collection('events')
      .doc<Event>(id)
      .valueChanges()
      .pipe(
        map((event) => {
          // Si el evento no existe, devolver null
          return event ? event : null;
        })
      );
  }
}

