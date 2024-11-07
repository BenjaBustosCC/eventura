import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';  
import { Observable } from 'rxjs';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {
  eventId: string | null = null;  // Para guardar el ID del evento
  event: any = null;  // Para guardar los datos del evento

  constructor(
    private router: Router,
    private route: ActivatedRoute,  // Para acceder a los parámetros de la URL
    private firestore: AngularFirestore  // Para interactuar con Firestore
  ) {}

  ngOnInit() {
    // Obtener el ID del evento desde la URL
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');  // 'id' es el parámetro que definimos en la ruta
      if (this.eventId) {
        this.loadEvent(this.eventId);  // Cargar el evento desde Firestore
      }
    });
  }

  // Método para cargar los datos del evento desde Firestore
  loadEvent(eventId: string) {
    this.firestore.collection('events').doc(eventId).valueChanges().subscribe(eventData => {
      this.event = eventData;  // Asignamos los datos del evento al objeto 'event'
    });
  }

  onBackButtonPressed() {
    this.router.navigate(['/tabs/home']);  // Volver a la página de inicio
  }
}