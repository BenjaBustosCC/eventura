import { Component, OnInit } from '@angular/core';
import { SessionManager } from 'src/managers/SessionManager';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user: string = '';

  constructor(private sessionManager: SessionManager) {}

  ngOnInit() {
    this.user = this.sessionManager.getUser();
  }
}