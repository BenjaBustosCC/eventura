import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { homeOutline, locationOutline, duplicateOutline, personOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { EventManagetUseCase } from 'src/app/use-cases/event-manage.use-case';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.page.html',
  styleUrls: ['./event-management.page.scss'],
})
export class EventManagementPage implements OnInit {

  events: any[] = []; 
  constructor(
    private router: Router,
    private eventManagetUseCase: EventManagetUseCase
  ) {
    addIcons({
      'home-outline': homeOutline,
      'location-outline': locationOutline,
      'duplicate-outline': duplicateOutline,
      'person-outline': personOutline,
    });
  }

  ngOnInit() {
    this.loadEvents();
  }


  loadEvents() {
    this.eventManagetUseCase.getEvents().subscribe(events => {
      this.events = events; 
      console.log('Eventos obtenidos:', events); 
    });
  }

  onBackButtonPressed() {
    this.router.navigate(['/tabs/profile'])}
  
  
  async deleteEvent(eventId: string) {
    try {
      const response = await this.eventManagetUseCase.deleteEvent(eventId);
      if (response.success) {
 
        this.events = this.events.filter(event => event.id !== eventId);
        console.log(response.message);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
    }
  }

  onEditButtonPressed(eventId: string) {
    this.router.navigate([`/event-edit/${eventId}`]); // Pasa el ID en la URL
  }

}
