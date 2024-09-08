import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import {homeOutline, locationOutline, duplicateOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    addIcons({
      'home-outline':homeOutline,
      'location-outline': locationOutline,
      'duplicate-outline': duplicateOutline,
      'person-outline': personOutline
    })
  }
}
