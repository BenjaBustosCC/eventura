import { Component, OnInit } from '@angular/core';
import { CancelAlertService } from 'src/managers/CancelAlertService';
import { StorageService } from 'src/managers/StorageService';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  user: any;

  constructor(

    private cancelAlertService: CancelAlertService,
    private storageService: StorageService
  ) {}

  ngOnInit() {}
  async ionViewDidEnter() {
    this.user = await this.storageService.get('user');
    if (!this.user) {
      console.log('No se encontraron datos del usuario.');
    }
  }
}
