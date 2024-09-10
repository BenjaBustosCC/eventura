import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import {homeOutline, locationOutline, duplicateOutline, personOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {
    addIcons({
      'home-outline':homeOutline,
      'location-outline': locationOutline,
      'duplicate-outline': duplicateOutline,
      'person-outline': personOutline
    })
  }
  onEventButtonPressed() {
    this.router.navigate(['/evento'])
  }
}

