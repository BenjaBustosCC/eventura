import { Component, OnInit } from '@angular/core';
import { SessionManager } from 'src/managers/SessionManager';  // Importar el SessionManager

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: string = '';

  constructor(private sessionManager: SessionManager) { } 

  ngOnInit() {
    this.user = this.sessionManager.getUser();  
  }

}

