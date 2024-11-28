import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogoutUseCase } from 'src/app/use-cases/user-logout.use-case';
import { CancelAlertService } from 'src/managers/CancelAlertService';
import { StorageService } from 'src/managers/StorageService';
import { UserUpdateUseCase } from 'src/app/use-cases/user-update.case-use';
import { UserService } from 'src/app/use-cases/user-read.use-case';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  profileImage: string | undefined;

  constructor(
    private router: Router, 
    private logoutUseCase: UserLogoutUseCase,
    private cancelAlertService: CancelAlertService,
    private storageService: StorageService,
    private userUpdateUseCase: UserUpdateUseCase,
    private alert: CancelAlertService,
    private userService: UserService // Inyectar el servicio de usuario
  ) {}

  ngOnInit() {
    this.loadUserData();
  }
  /**
   * Cargar los datos del usuario y asignarlos a las variables del componente.
   */
  async loadUserData() {
    const userData = await this.userService.getUserData(); // Llamar al servicio para obtener datos del usuario

    if (userData) {
      this.user = userData;
      this.profileImage = userData.imagen || 'assets/default-profile.png'; // Asignar imagen si existe
    } else {
      console.log('No se pudieron cargar los datos del usuario.');
      this.profileImage = 'assets/default-profile.png'; // Imagen por defecto
    }
  }

  async ionViewDidEnter() {
    // Si quieres que se recarguen los datos cada vez que la vista entre en foco, usa este método.
    await this.loadUserData();
  }

  async changeProfilePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
  
      // Asegúrate de que image.dataUrl es una cadena antes de usarlo
      const imageDataUrl = image.dataUrl || ''; // Si es undefined, usa una cadena vacía
  
      this.profileImage = imageDataUrl; // Guarda la imagen como Base64
  
      // Llama al servicio para actualizar la imagen
      await this.userUpdateUseCase.updateProfilePicture(imageDataUrl);
  
      console.log('Imagen de perfil actualizada en la base de datos');
    } catch (error) {
      console.error('Error al capturar o actualizar la imagen:', error);
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
    this.router.navigate(['/pw-update']);
  }

  async onDeleteAccountPressed() {
    // Obtener el usuario logueado del StorageService
    this.user = await this.storageService.get('user');
    if (this.user && this.user.uid) {
      const uid = this.user.uid; 
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