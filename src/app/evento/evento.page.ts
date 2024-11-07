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
  eventId: string | null = null;   
  event: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private firestore: AngularFirestore  
  ) {}

  ngOnInit() {
    // Obtener el ID del evento desde la URL
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');  
      if (this.eventId) {
        this.loadEvent(this.eventId);  
      }
    });
  }

  loadEvent(eventId: string) {
    this.firestore.collection('events').doc(eventId).valueChanges().subscribe(eventData => {
      this.event = eventData; 
    });
  }

  onBackButtonPressed() {
    this.router.navigate(['/tabs/home']);  // Volver a la página de inicio
  }
}