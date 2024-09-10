import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, locationOutline, duplicateOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showNavBar: boolean = true;

  constructor(private router: Router) {
    //iconos:3
    addIcons({
      'home-outline': homeOutline,
      'location-outline': locationOutline,
      'duplicate-outline': duplicateOutline,
      'person-outline': personOutline
    });

    this.router.events.subscribe(() =>{
      const currentRoute = this.router.url;
      if (currentRoute.includes('/addEvent') || currentRoute.includes('/profile')|| currentRoute.includes('/splash') || currentRoute.includes('/login') || currentRoute.includes('/register') || currentRoute.includes('/evento')) {
        this.showNavBar = false;
      } else {
        this.showNavBar = true;
      }
  });
  }
}
