import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsUseCase {

  constructor(private firestore: AngularFirestore) {}

  // Método para obtener todos los eventos desde Firestore
  getEvents(): Observable<any[]> {
    return this.firestore.collection('events').valueChanges();
  }
}