import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogoutUseCase } from 'src/app/use-cases/user-logout.use-case';
import { CancelAlertService } from 'src/managers/CancelAlertService';
import { StorageService } from 'src/managers/StorageService';
import { UserUpdateUseCase } from 'src/app/use-cases/user-update.case-use';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;

  constructor(
    private router: Router, 
    private logoutUseCase: UserLogoutUseCase,
    private cancelAlertService: CancelAlertService,
    private storageService: StorageService,
    private userUpdateUseCase: UserUpdateUseCase,
    private alert: CancelAlertService

  ) {}

  ngOnInit() {}
  async ionViewDidEnter() {
    this.user = await this.storageService.get('user');
    if (!this.user) {
      console.log('No se encontraron datos del usuario.');
    }
  }

  async onSignOutButtonPressed() {
    this.cancelAlertService.showAlert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      async () => {
        this.logoutUseCase.performLogout();
        this.router.navigate(['/splash']);
      },
      () => { }
    );
  }
  onUpdatePasswordPressed() {
    this.router.navigate(['/pw-update']) 
  }
  onEventManagementPressed() {
    this.router.navigate(['/event-management'])}
 async onDeleteAccountPressed() {
    // obtener el user logeado del storageservice
    this.user = await this.storageService.get('user');
    // verificar que haya user y uid
    if (this.user && this.user.uid) {
    // extraer el uid del usuario
      const uid = this.user.uid; 
    // enviar el uid al caso de uso de delete account  
      const result = await this.userUpdateUseCase.performDeleteAccount(uid);

      if (result.success) {
        this.alert.showAlert(
          'Eliminación Exitosa',
          'Tu cuenta ha sido eliminada correctamente.',
          () => {
            this.router.navigate(['/login']); 
          }
        );
      } else {
        this.alert.showAlert(
          'Error',
          result.message,
          () => { }
        );
      }
    } else {
      this.alert.showAlert(
        'Error',
        'No se pudo obtener la información del usuario.',
        () => { }
      );
    }
  }
}